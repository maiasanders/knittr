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
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.server.ResponseStatusException;

@RestController
@AllArgsConstructor
@CrossOrigin
//@PreAuthorize("permitAll()")
public class AuthController {
    private UserDao dao;
    private AuthService service;
//    @Autowired
//    private final AuthenticationManagerBuilder authenticationManagerBuilder;
//    private final TokenProvider



//    TODO add greater authorization/security checks

    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public LoginResponseDto login(@Valid @RequestBody LoginDto loginDto) {
        System.out.println("I'm in");
        try {
            return service.login(loginDto);

        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }


    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(path = "/register", method = RequestMethod.POST)
    public LoginResponseDto register(@Valid @RequestBody RegisterUserDto dto) {
        User user;
        try {
            user = service.register(dto);
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "DAO error - " + e.getMessage());
        }
        return login(new LoginDto(dto.getUsername(), dto.getPassword()));
    }


}
