package com.knittr.api.service;

import com.knittr.api.dao.PatternDao;
import com.knittr.api.dao.ProjectDao;
import com.knittr.api.dao.StepDao;
import com.knittr.api.dao.UserDao;
import com.knittr.api.model.Pattern;
import com.knittr.api.model.Project;
import com.knittr.api.model.Step;
import com.knittr.api.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@Component
public class StepService {
    private StepDao dao;
    private UserDao userDao;
    private ProjectDao projectDao;
    private PatternDao patternDao;

    public Step addStep(Step step, Principal principal) {
        Pattern pattern = patternDao.getPatternById(step.getPatternId());
        if (isAuthUser(principal, pattern.getAuthor().getUserId())){
            return dao.createStep(step);
        } else {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }

    public List<Step> getStepsByProject(int id, Principal principal) {
        Project project = projectDao.getProjectById(id);

        if (isAuthUser(principal, project.getMakerId())) {
            return dao.getStepsByProject(id);
        } else {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }

    private boolean isAuthUser(Principal principal, int userID) {
        User user = userDao.getUserByName(principal.getName());
        return userID == user.getUserId();
    }

}
