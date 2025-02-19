package com.knittr.api.security.jwt;

import org.springframework.beans.factory.InitializingBean;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;


import java.security.Key

public class TokenProvider implements InitializingBean {
    private Key key = Jwts.SIG.HS256.key().build();

    private String jws = Jwts.builder().subject("Joe").signWith(key).compact();
    @Override
    public void afterPropertiesSet() throws Exception {
        this.key = Jwts.SIG.HS256.key().build();
    }
}
