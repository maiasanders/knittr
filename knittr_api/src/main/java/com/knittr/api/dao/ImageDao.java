package com.knittr.api.dao;

import com.knittr.api.model.Image;

public interface ImageDao {

    Image addImage(Image image);
    Image getImageById(int id);
}
