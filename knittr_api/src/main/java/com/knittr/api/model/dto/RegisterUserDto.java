package com.knittr.api.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class RegisterUserDto {
    private String username;
    private String password;
}
