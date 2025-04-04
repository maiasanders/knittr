package com.knittr.api.service;

import com.knittr.api.dao.UserDao;
import com.knittr.api.exception.DaoException;
import com.knittr.api.model.User;
import com.knittr.api.model.dto.LoginDto;
import com.knittr.api.model.dto.LoginResponseDto;
import com.knittr.api.model.dto.RegisterUserDto;
import com.knittr.api.security.jwt.TokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@Component
@AllArgsConstructor
public class AuthService {
    private UserDao dao;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;

    public User register(RegisterUserDto dto) {

        User user = new User();
        String hash = getPasswordHash(dto.getPassword());
        user.setUsername(dto.getUsername());
        user.setPassword(hash);
        return dao.createUser(user);
    }

    private String getPasswordHash(String password) {
        String hash = new BCryptPasswordEncoder().encode(password);
        return hash;
    }

    public LoginResponseDto login(LoginDto loginDto) {

        User user;

        try {
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.createToken(authentication);

            user = dao.getUserByName(loginDto.getUsername());

            return new LoginResponseDto(user.getUsername(), jwt);
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "DAO error - " + e.getMessage());
        }

//        boolean matches = new BCryptPasswordEncoder().matches(loginDto.getPassword(), user.getPassword());

//        if (matches) {
//            return new LoginResponseDto(loginDto.getUsername());
//        }
//        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
    }
}
