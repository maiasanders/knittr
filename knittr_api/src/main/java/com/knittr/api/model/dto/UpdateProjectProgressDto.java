package com.knittr.api.model.dto;


import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UpdateProjectProgressDto {
    @Positive
    private int newRow;
    @Positive
    private int makerId;
}
