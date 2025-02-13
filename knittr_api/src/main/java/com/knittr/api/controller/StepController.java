package com.knittr.api.controller;

import com.knittr.api.dao.StepDao;
import com.knittr.api.model.Pattern;
import com.knittr.api.model.Step;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@AllArgsConstructor
@Controller
public class StepController {
    private StepDao dao;

    @PostMapping("/steps")
    public Step addStep(@RequestBody Step step) {
//        TODO do I need to go through service layer for validation (e.g. auth) or can I shoot directly to dao
        return null;
    }
}
