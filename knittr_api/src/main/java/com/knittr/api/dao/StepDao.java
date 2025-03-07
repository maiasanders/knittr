package com.knittr.api.dao;

import com.knittr.api.model.Step;

import java.util.List;

public interface StepDao {
    Step createStep(Step step);

    List<Step> getStepsByProject(int id);

    List<Step> getStepsByVariant(int id);
}
