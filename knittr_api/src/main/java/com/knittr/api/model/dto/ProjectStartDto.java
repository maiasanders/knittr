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
    @Positive
    private int variantId;
    private boolean isTemplate;
}
