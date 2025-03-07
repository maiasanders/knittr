package com.knittr.api.model.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.bind.DefaultValue;

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class StepDto {
    @Positive
    private int variantId;
    @NotEmpty
    private String title;
    @Positive
    private int stepNum;

}
