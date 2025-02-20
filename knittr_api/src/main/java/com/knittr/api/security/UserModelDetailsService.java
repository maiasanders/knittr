package com.knittr.api.security;

import com.knittr.api.dao.UserDao;
import com.knittr.api.model.User;
import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component("userDetailsService")
@AllArgsConstructor
public class UserModelDetailsService implements UserDetailsService {
    private final UserDao dao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return createSpringSecurityUser(username, dao.getUserByName(username));
    }

    private org.springframework.security.core.userdetails.User createSpringSecurityUser(String username, User user) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(), user.getPassword(), authorities
        );
    }
}
