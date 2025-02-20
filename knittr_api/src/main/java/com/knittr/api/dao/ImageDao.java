package com.knittr.api.dao;

import com.knittr.api.model.Image;

import java.util.List;

public interface ImageDao {

    Image addImage(Image image);
    Image getImageById(int id);

    List<Image> getImagesByPattern(int id);

    Image setDefaultImage(int imageId, int patternId);
}
