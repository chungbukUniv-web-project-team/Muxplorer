package muxploer.gatewayservice;

import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Component
@Slf4j
public class MyAuthorizationFilter extends AbstractGatewayFilterFactory<MyAuthorizationFilter.Config> {

    @Autowired
    private Environment env;
    public MyAuthorizationFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            ServerHttpRequest req = exchange.getRequest();
            if(!req.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)){
                return onError(exchange,"인가 헤더를 찾지 못하였습니다", HttpStatus.UNAUTHORIZED);
            }
            String authorization = Objects.requireNonNull(req.getHeaders().get(HttpHeaders.AUTHORIZATION)).get(0);
            String token = authorization.replace("Bearer", "").trim();
            if(!isJwtValid(token)){
                return onError(exchange,"토큰이 유효하지 않습니다", HttpStatus.UNAUTHORIZED);
            }
            return chain.filter(exchange);
        });
    }

    private Mono<Void> onError(ServerWebExchange exchange, String e, HttpStatus status){
        ServerHttpResponse res = exchange.getResponse();
        res.setStatusCode(status);

        log.error(e);
        return res.setComplete();
    }
    private boolean isJwtValid(String token){
        boolean isValid = true;

        String subject = null;

        try{
            subject = Jwts.parser()
                    .setSigningKey(env.getProperty("token.secret"))
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        }catch (Exception ex){
            isValid = false;
        }
        if(subject==null || subject.isEmpty()){
            isValid=false;
        }
        return isValid;
    }
    public static class Config {

    }
}

