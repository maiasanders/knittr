package com.knittr.api.service;

import com.knittr.api.dao.*;
import com.knittr.api.model.*;
import com.knittr.api.model.dto.RowDto;
import com.knittr.api.model.dto.StepDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor
public class StepService {
    private StepDao dao;
    private UserDao userDao;
    private ProjectDao projectDao;
    private PatternDao patternDao;
    private RowDao rowDao;

    public Step addStep(StepDto dto, Principal principal) {
        Pattern pattern = patternDao.getPatternByVariant(dto.getVariantId());
        if (isAuthUser(principal, pattern.getAuthor().getUserId())){
            Step step = dao.createStep(stepFromDto(dto));
            List<Row> addedRows = new ArrayList<>();
            for (RowDto rowDto : dto.getRows()) {
                Row row = new Row();
                row.setRowNum(rowDto.getRowNum());
                row.setStepId(step.getStepId());
                row.setDirections(rowDto.getDirections());
                Row addedRow = rowDao.createRow(row);
                addedRows.add(addedRow);
            }
            step.setRows(addedRows);
            return step;
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
