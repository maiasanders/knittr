package com.knittr.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Step {
    private int stepId;
    private int variantId;
    private String title;
    private int stepNum;
    private List<Row> rows;
}
