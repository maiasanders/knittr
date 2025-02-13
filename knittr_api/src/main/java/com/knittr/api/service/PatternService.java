package com.knittr.api.service;

import com.knittr.api.dao.PatternDao;
import com.knittr.api.dao.UserDao;
import com.knittr.api.model.Pattern;
import com.knittr.api.model.User;
import com.knittr.api.model.dto.PatternDto;

import java.security.Principal;
import java.util.List;

public class PatternService {
    private PatternDao dao;
    private UserDao userDao;

    public List<Pattern> getPatterns() {
        return dao.getPatterns();
    }

    public List<Pattern> getSavedPatterns(Principal principal) {
        return dao.getSavedPatternsByUserId( getUserId(principal) );
    }

    public Pattern createPattern(Principal principal, PatternDto dto) {
        Pattern pattern = mapDtoToPattern(dto);
        pattern.setAuthor( userDao.getUserByName(principal.getName()) );
        return dao.createPattern(pattern);
    }

    private int getUserId(Principal principal) {
        User user = userDao.getUserByName(principal.getName());
        return user.getUserId();
    }

    private Pattern mapDtoToPattern(PatternDto dto) {
        Pattern pattern = new Pattern();
        pattern.setName(dto.getName());
        pattern.setDesc(dto.getDesc());
        pattern.setCategories(dto.getCategories());
        if (dto.getSizes() != null) {
            pattern.setSizes(dto.getSizes());
        }
        return pattern;
    }
}
