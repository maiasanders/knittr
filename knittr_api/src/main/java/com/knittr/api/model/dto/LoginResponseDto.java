package com.knittr.api.model.dto;

import com.knittr.api.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.lang.NonNull;

@Getter
@AllArgsConstructor
@Setter
public class LoginResponseDto {
    private String username;
    private String token;
}
