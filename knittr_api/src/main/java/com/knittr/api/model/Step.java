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
//    TODO Is this the best way to do it? revisit. Can I get rid of the separate tables for step vs step_by_size_yarn in my DB?
    private int stepId;
    private int patternId;
    private int sizeId;
    private int yarnId;
    private String title;
    private int stepNum;
    private List<Row> rows;
//    private int startRow;
////   TODO Does end row mean end of single repeat or end of all repeats?
//    private int endRow;
//    private int repeats;
}
