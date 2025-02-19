package com.knittr.api.model.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Getter
@Setter
public class RegisterUserDto {
    @NotBlank
    private String username;
    @NotBlank
    private String password;
}
