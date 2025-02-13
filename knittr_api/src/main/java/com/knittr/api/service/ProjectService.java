package com.knittr.api.service;

import com.knittr.api.dao.ProjectDao;
import com.knittr.api.dao.UserDao;
import com.knittr.api.model.*;
import com.knittr.api.model.dto.ProjectStartDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.List;

@AllArgsConstructor
@Component
public class ProjectService {
    private ProjectDao dao;
    private UserDao userDao;

    public Project createProject( ProjectStartDto dto, Principal principal ) {
        Project newProject = new Project();

        newProject.setMakerId( getUserId(principal) );
//        TODO do I need these lines?
        newProject.setCurrentRow(0);
        newProject.setCompleted(false);

        Pattern pattern = new Pattern();
        pattern.setPatternId(dto.getPatternId());
        newProject.setPattern(pattern);

        if ( dto.getYarnId() != 0 ){
            Yarn yarn = new Yarn();
            yarn.setYarnId(dto.getYarnId());
            newProject.setYarn(yarn);
        }

        if (dto.getSizeId() != 0 ) {
            Size size = new Size();
            size.setSizeId(dto.getSizeId());
            newProject.setSize(size);
        }

        return dao.createProject(newProject);
    }

    public List<Project> getProjects(Principal principal) {
        return dao.getCurrentProjectsByUser( getUserId(principal) );
    }

    public List<Project> getCompletedProjects(Principal principal) {
        return dao.getCompletedProjectsByUSer( getUserId(principal) );
    }

    private int getUserId(Principal principal) {
        User user = userDao.getUserByName(principal.getName());
        return user.getUserId();
    }
}
