package com.knittr.api.model.dto;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ProjectStartDto {
    @NonNull
    @Positive
    private int patternId;
    private int yarnId;
    private int sizeId;
}
