package com.knittr.api.service;

import com.knittr.api.dao.PatternDao;
import com.knittr.api.dao.ProjectDao;
import com.knittr.api.dao.StepDao;
import com.knittr.api.dao.UserDao;
import com.knittr.api.model.*;
import com.knittr.api.model.dto.StepDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@Component
@AllArgsConstructor
public class StepService {
    private StepDao dao;
    private UserDao userDao;
    private ProjectDao projectDao;
    private PatternDao patternDao;

    public Step addStep(StepDto dto, Principal principal) {
        Pattern pattern = patternDao.getPatternByVariant(dto.getVariantId());
        if (isAuthUser(principal, pattern.getAuthor().getUserId())){
            return dao.createStep(stepFromDto(dto));
        } else {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }

    private Step stepFromDto(StepDto dto) {
        Step step = new Step();
        step.setVariantId(dto.getVariantId());
        step.setTitle(dto.getTitle());
        step.setStepNum(dto.getStepNum());
        return step;
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
