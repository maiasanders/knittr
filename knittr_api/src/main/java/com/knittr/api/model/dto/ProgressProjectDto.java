package com.knittr.api.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ProgressProjectDto {
    private int projectId;
    private int currentRow;
}
