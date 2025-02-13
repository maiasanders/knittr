package com.knittr.api.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.lang.NonNull;

@Getter
@AllArgsConstructor
public class LoginResponseDto {
    @NonNull
    private String username;
}
