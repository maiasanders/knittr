package com.knittr.api.controller;

import com.knittr.api.dao.CategoryDao;
import com.knittr.api.model.Category;
import com.knittr.api.model.dto.CategoryDto;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@AllArgsConstructor
@RestController
@RequestMapping("/categories")
@CrossOrigin
public class CategoryController {
    private CategoryDao dao;

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public Category addCategory(@RequestBody CategoryDto dto ) {
        return dao.createCategory(new Category(0, dto.getCategoryName()));
    }
}
