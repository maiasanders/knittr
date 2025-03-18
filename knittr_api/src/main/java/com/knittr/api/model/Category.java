package com.knittr.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Category {
    private int categoryId;
    private String category_name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Category category = (Category) o;

        if (categoryId != category.categoryId) return false;
        return category_name.equals(category.category_name);
    }

    @Override
    public int hashCode() {
        int result = categoryId;
        result = 31 * result + category_name.hashCode();
        return result;
    }
}
