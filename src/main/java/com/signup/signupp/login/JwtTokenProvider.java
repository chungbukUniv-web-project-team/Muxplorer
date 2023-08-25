package com.signup.signupp.login;

import com.signup.signupp.user.UserRole;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${security.jwt.token.secret-key}")
    String secret ;
    private final Key key;
    private final long expireTime;
    public JwtTokenProvider(@Value("${security.jwt.token.secret-key}") final String secretKey, @Value("${security.jwt.token.expire-time}") final long expireTime){
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
        this.expireTime = expireTime;
    }

    public String createToken(final String subject, final UserRole userRole) {
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + expireTime);
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .claim("USER_ROLE",userRole.getValue())
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
    public String createRefreshToken(final String subject) {
        Date now = new Date();
        Date expireDate = new Date(now.getTime() + (expireTime*2016));
        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expireDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secret).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }
    public UserRole getUserRoleFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
        String userRoleValue = (String) claims.get("userRole");

        // Now convert the value back to UserRole enum
        if ("ROLE_ADMIN".equals(userRoleValue)) {
            return UserRole.ADMIN;
        } else if ("ROLE_USER".equals(userRoleValue)) {
            return UserRole.USER;
        } else {
            // Handle unrecognized role value
            return null;
        }
    }
}
