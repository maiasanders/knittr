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
    private int patternId;
    private int yarnId;
    private int sizeId;
    @NotEmpty
    private String title;
    @Positive
    private int stepNum;

    public StepDto(int patternId, int yarnId, String title, int stepNum) {
        this.patternId = patternId;
        this.yarnId = yarnId;
        this.sizeId = 1;
        this.title = title;
        this.stepNum = stepNum;
    }
}
