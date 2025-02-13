package com.knittr.api.controller;

import com.knittr.api.dao.ProjectDao;
import com.knittr.api.model.Project;
import com.knittr.api.model.dto.ProgressProjectDto;
import com.knittr.api.model.dto.ProjectStartDto;
import com.knittr.api.service.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Controller("/projects")
@AllArgsConstructor
public class ProjectController {
    private ProjectDao dao;
    private ProjectService service;

    @GetMapping("/{id}")
    public Project getProject(@PathVariable int id) {
        return dao.getProjectById(id);
    }

    @PostMapping
    public Project createProject(@RequestBody ProjectStartDto dto, Principal principal) {
        return service.createProject(dto, principal);
    }

//    Get current projects
    @GetMapping
    public List<Project> getProjects(Principal principal) {
        return service.getProjects(principal);
    }

//    Get completed projects
    @GetMapping("/completed")
    public List<Project> getCompletedProjects(Principal principal) {
        return service.getCompletedProjects(principal);
    }

//    Have a specific endpoint for progressing through pattern
    @PutMapping("/{id}/progress")
    public Project updateProject(@PathVariable int id, @RequestBody ProgressProjectDto dto) {
        return dao.updateProjectProgress(id, dto.getCurrentRow());
    }

//    Mark a project as completed
    @PutMapping("/{id}/complete")
    public Project completeProject(@PathVariable int id) {
        return dao.completeProject(id);
    }
}
