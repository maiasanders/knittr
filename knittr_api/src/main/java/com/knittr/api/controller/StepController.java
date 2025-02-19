package com.knittr.api.controller;

import com.knittr.api.dao.StepDao;
import com.knittr.api.model.Pattern;
import com.knittr.api.model.Step;
import com.knittr.api.service.StepService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@AllArgsConstructor
@RestController
@Component
@CrossOrigin
@PreAuthorize("isAuthenticated()")
public class StepController {
    private StepDao dao;
    private StepService service;
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/steps")
    public Step addStep(@RequestBody Step step, Principal principal) {
        return service.addStep(step, principal);
    }

    @GetMapping("/projects/{id}/steps")
    public List<Step> getStepsByProject(@PathVariable int id, Principal principal) {
        return service.getStepsByProject(id, principal);
    }
}
