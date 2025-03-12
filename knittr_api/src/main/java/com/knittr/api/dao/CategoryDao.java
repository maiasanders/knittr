package com.knittr.api.dao;

import com.knittr.api.model.Category;

import java.util.List;

public interface CategoryDao {
    Category getCategoryById(int id);
    List<Category> getCategoriesByPattern(int id);

    Category createCategory(Category category);

    List<Category> getCategories();

}
