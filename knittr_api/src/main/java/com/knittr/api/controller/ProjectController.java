package com.knittr.api.controller;

import com.knittr.api.dao.ProjectDao;
import com.knittr.api.model.Project;
import com.knittr.api.model.dto.ProgressProjectDto;
import com.knittr.api.model.dto.ProjectStartDto;
import com.knittr.api.model.dto.UpdateProjectProgressDto;
import com.knittr.api.service.ProjectService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@AllArgsConstructor
public class ProjectController {
    private ProjectDao dao;
    private ProjectService service;

    @GetMapping("/projects/{id}")
    public Project getProject(@PathVariable int id) {
        return dao.getProjectById(id);
    }

    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/projects")
    public Project createProject(@RequestBody ProjectStartDto dto, Principal principal) {
        return service.createProject(dto, principal);
    }

//    Get current projects
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/projects")
    public List<Project> getProjects(Principal principal) {
        return service.getProjects(principal);
    }

//    Get completed projects
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/projects/completed")
    public List<Project> getCompletedProjects(Principal principal) {
        return service.getCompletedProjects(principal);
    }

//    Mark a project as completed
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/projects/{id}/complete")
    public Project completeProject(@PathVariable int id, Principal principal) {
        return service.completeProject(id, principal);
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/projects/{id}/progress")
    public Project updateProjectProgress(@PathVariable int id,
                                         @RequestBody @Valid UpdateProjectProgressDto dto,
                                         Principal principal) {
        return service.updateProgress(id, dto, principal);
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/variants/{id}/template")
    public Project getTemplateProject(@PathVariable int id, Principal principal) {
        return service.getTemplatePattern(id, principal);
    }
}
