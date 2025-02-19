package com.knittr.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Project {
    private int projectId;
    private int makerId;
    private Pattern pattern;
    private Yarn yarn;
    private Size size;
    private String yarnsUsed;
    private int currentRow;
    private boolean isCompleted;
    private List<Note> notes;
    private List<Step> steps;
}
