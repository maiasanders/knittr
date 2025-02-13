package com.knittr.api.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ImageDto {
    @NotBlank
    private String imageLink;
    private String desc;
    @Positive
    private int patternId;
}
