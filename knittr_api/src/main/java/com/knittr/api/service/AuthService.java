package com.knittr.api.service;

import com.knittr.api.dao.UserDao;
import com.knittr.api.exception.DaoException;
import com.knittr.api.model.User;
import com.knittr.api.model.dto.RegisterUserDto;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private UserDao dao;

    public User register(RegisterUserDto dto) {

        User user = new User(dto.getUsername(), dto.getPassword());
        return dao.createUser(user);
    }
}
