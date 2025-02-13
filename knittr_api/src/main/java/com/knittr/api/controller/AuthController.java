package com.knittr.api.controller;

import com.knittr.api.dao.UserDao;
import com.knittr.api.exception.DaoException;
import com.knittr.api.model.User;
import com.knittr.api.model.dto.LoginDto;
import com.knittr.api.model.dto.LoginResponseDto;
import com.knittr.api.model.dto.RegisterUserDto;
import com.knittr.api.service.AuthService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Null;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.server.ResponseStatusException;

@Controller
public class AuthController {
    private UserDao dao;
    private AuthService service;

//    TODO add greater authorization/security checks

    @PostMapping("/login")
    public LoginResponseDto login(@Valid @RequestBody LoginDto loginDto) {

        User user = dao.getUserByName(loginDto.getUsername());

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect username or password");
        }

        String passwordHash = new BCryptPasswordEncoder().encode(loginDto.getPassword());
        if (passwordHash.equals(user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Incorrect username or password");
        }

        return new LoginResponseDto(loginDto.getUsername());
    }

    @PostMapping("/register")
    public LoginResponseDto register(@Valid RegisterUserDto dto) {
        User user;
        try {
            user = service.register(dto);
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "DAO error - " + e.getMessage());
        }
        return null;
    }
}
