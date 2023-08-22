package muxploer.gatewayservice;

import io.jsonwebtoken.Claims;
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

@Component
@Slf4j
public class OnlyAdminFilter extends AbstractGatewayFilterFactory<OnlyAdminFilter.Config> {

    @Autowired
    private Environment env;

    public OnlyAdminFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return ((exchange, chain) -> {
            ServerHttpRequest req = exchange.getRequest();

            // 이 부분에서 JWT 토큰을 파싱하고 USER_ROLE 값을 확인하여 필터링할 수 있습니다.
            String authorizationHeader = req.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
            if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
                return onError(exchange, "인가 헤더를 찾지 못하였습니다", HttpStatus.UNAUTHORIZED);
            }
            String token = authorizationHeader.replace("Bearer", "").trim();

            if (!isUserRoleAdmin(token)) {
                return onError(exchange, "ROLE_ADMIN이 아닌 사용자는 허용되지 않습니다", HttpStatus.FORBIDDEN);
            }

            return chain.filter(exchange);
        });
    }

    private Mono<Void> onError(ServerWebExchange exchange, String errorMessage, HttpStatus status) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(status);

        log.error(errorMessage);
        return response.setComplete();
    }

    private boolean isUserRoleAdmin(String token) {
        boolean isAdmin = false;

        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(env.getProperty("token.secret"))
                    .parseClaimsJws(token)
                    .getBody();

            String userRole = claims.get("USER_ROLE", String.class);
            if ("ROLE_ADMIN".equals(userRole)) {
                isAdmin = true;
            }
        } catch (Exception ex) {
            // 예외 처리
        }

        return isAdmin;
    }

    public static class Config {

    }
}





