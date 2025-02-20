package com.knittr.api.service;

import com.knittr.api.dao.ImageDao;
import com.knittr.api.dao.PatternDao;
import com.knittr.api.dao.UserDao;
import com.knittr.api.model.Image;
import com.knittr.api.model.Pattern;
import com.knittr.api.model.User;
import com.knittr.api.model.dto.DefaultImageDto;
import com.knittr.api.model.dto.ImageDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;

@AllArgsConstructor
@Component
public class ImageService {
    private ImageDao dao;
    private UserDao userDao;
    private PatternDao patternDao;



    public Image addImage(Principal principal, ImageDto dto) {
        User user = userDao.getUserByName(principal.getName());

        Image image = new Image();
        image.setImageLink(dto.getImageLink());
        image.setPatternId(dto.getPatternId());
        image.setSubmittedBy(user);
        image.setDesc(dto.getDesc());

        return dao.addImage(image);
    }

    public Image setDefaultImage(Principal principal, DefaultImageDto dto) {
        if (isAuthor(principal, dto.getPatternId())) {
            return dao.setDefaultImage(dto.getImageId(), dto.getPatternId());
        }
        throw new ResponseStatusException(HttpStatus.FORBIDDEN);
    }

    private boolean isAuthor(Principal principal, int patternId) {
        Pattern pattern = patternDao.getPatternById(patternId);
        User user = userDao.getUserByName(principal.getName());
        return pattern.getAuthor().getUserId() == user.getUserId();
    }
}
