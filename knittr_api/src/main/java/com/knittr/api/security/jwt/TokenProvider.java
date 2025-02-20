package com.knittr.api.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.InitializingBean;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;


import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.stream.Collectors;

@Component
public class TokenProvider implements InitializingBean {
    private SecretKey key = Jwts.SIG.HS256.key().build();

    private String jws = Jwts.builder().subject("Joe").signWith(key).compact();
    private final long tokenValidityInMillisec = 108000 * 1000;
    private static final String AUTH_KEY = "auth";
    @Override
    public void afterPropertiesSet() throws Exception {
        this.key = Jwts.SIG.HS256.key().build();
    }

    public String createToken(Authentication authentication) {
        Date validity = new Date(new Date().getTime() + tokenValidityInMillisec);
        return Jwts.builder()
                .subject(authentication.getName())
                .signWith(key)
                .expiration(validity)
                .compact();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(authToken);
            return true;
        } catch (JwtException e) {
            return false;
        }
//        TODO add logging functionality?
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        Collection<? extends GrantedAuthority> authorities = new HashSet<>();
//        Collection<? extends GrantedAuthority> authorities = Arrays.stream(claims.get(AUTH_KEY).toString().split(","))
//                .map(SimpleGrantedAuthority::new)
//                .toList();

        User principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken( principal, token, authorities );
    }
}
