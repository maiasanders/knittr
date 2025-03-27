package com.knittr.api.service;

import com.knittr.api.dao.ImageDao;
import com.knittr.api.dao.PatternDao;
import com.knittr.api.dao.UserDao;
import com.knittr.api.model.Category;
import com.knittr.api.model.Pattern;
import com.knittr.api.model.Size;
import com.knittr.api.model.User;
import com.knittr.api.model.dto.PatternDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor
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
        List<Category> categories = new ArrayList<>();
        if (dto.getCatIds() != null) {
            for (int id : dto.getCatIds()) {
                Category category = new Category();
                category.setCategoryId(id);
                categories.add(category);
            }
        }
//        pattern.setCategories(dto.getCategories());
//        if (dto.getSizes() != null) {
//            pattern.setSizes(dto.getSizes());
//        }
        pattern.setCategories(categories);
        return pattern;
    }


    public List<Pattern> getPatternsByAuthor(Principal principal) {
        return dao.getPatternsByAuthor(getUserId(principal));
    }

    public void savePattern(Principal principal, int id) {
        int userId = getUserId(principal);
        dao.savePattern(userId, id);
    }

    public void unsavePattern(Principal principal, int id) {
        dao.unsavePattern(getUserId(principal), id);
    }

    public Pattern updatePattern(Principal principal, PatternDto dto, int id) {
        Pattern oldPattern = dao.getPatternById(id);
        if (!oldPattern.getAuthor().getUsername().equals(principal.getName())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        Pattern updatedPattern = mapDtoToPattern(dto);
        updatedPattern.setPatternId(id);
        return dao.updatePattern(updatedPattern);
    }
}
