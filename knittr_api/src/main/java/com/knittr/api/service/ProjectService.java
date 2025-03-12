package com.knittr.api.service;

import com.knittr.api.dao.ProjectDao;
import com.knittr.api.dao.UserDao;
import com.knittr.api.model.*;
import com.knittr.api.model.dto.ProjectStartDto;
import com.knittr.api.model.dto.UpdateProjectProgressDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@AllArgsConstructor
@Component
public class ProjectService {
    private ProjectDao dao;
    private UserDao userDao;


    public Project createProject( ProjectStartDto dto, Principal principal ) {
        Project newProject = new Project();
        PatternVariant variant = new PatternVariant();
        variant.setVariantId(dto.getVariantId());
        newProject.setVariant(variant);
        newProject.setTemplate(dto.getIsTemplate());
        newProject.setMakerId(getUserId(principal));

        return dao.createProject(newProject);
    }

    public List<Project> getProjects(Principal principal) {
        return dao.getCurrentProjectsByUser( getUserId(principal) );
    }

    public List<Project> getCompletedProjects(Principal principal) {
        return dao.getCompletedProjectsByUser( getUserId(principal) );
    }

    public Project updateProgress(int id, UpdateProjectProgressDto dto, Principal principal) {
        if (isAuthUser(principal, dto.getMakerId())) {
            return dao.updateProjectProgress(id, dto.getNewRow());
        } else {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }

    private int getUserId(Principal principal) {
        User user = userDao.getUserByName(principal.getName());
        return user.getUserId();
    }

    private boolean isAuthUser(Principal principal, int userId) {
        return getUserId(principal) == userId;
    }

    public Project completeProject(int id, Principal principal) {
        Project project = dao.getProjectById(id);
        if (isAuthUser(principal, project.getMakerId())) {
            return dao.completeProject(id);
        } else {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }

    public Project getTemplatePattern(int varId, Principal principal) {
        Project project = dao.getTemplateProject(varId);
        if (isAuthUser(principal, project.getMakerId())) {
            return project;
        } else {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }
}
