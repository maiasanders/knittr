package com.knittr.api.service;

import com.knittr.api.dao.ImageDao;
import com.knittr.api.dao.UserDao;
import com.knittr.api.model.Image;
import com.knittr.api.model.User;
import com.knittr.api.model.dto.ImageDto;
import lombok.AllArgsConstructor;

import java.security.Principal;

@AllArgsConstructor
public class ImageService {
    private ImageDao dao;
    private UserDao userDao;


    public Image addImage(Principal principal, ImageDto dto) {
        User user = userDao.getUserByName(principal.getName());

        Image image = new Image();
        image.setImageLink(dto.getImageLink());
        image.setPatternId(dto.getPatternId());
        image.setSubmittedBy(user);
        image.setDesc(dto.getDesc());

        return dao.addImage(image);
    }
}
