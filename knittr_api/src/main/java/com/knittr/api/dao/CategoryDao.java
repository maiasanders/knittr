package com.knittr.api.dao;

import com.knittr.api.model.Category;

import java.util.List;

public interface CategoryDao {
    List<Category> getCategoriesByPattern(int id);
}
