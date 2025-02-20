package com.knittr.api.dao;

import com.knittr.api.exception.DaoException;
import com.knittr.api.exception.NotFoundException;
import com.knittr.api.model.Category;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Component
@AllArgsConstructor
public class JdbcCategoryDao implements CategoryDao {

    public final String CONNECT_ERR = "Unable to connect to database";
    private JdbcTemplate template;

    @Override
    public Category getCategoryById(int id) {
        String sql = "SELECT * FROM categories WHERE category_id = ?";
        try {
            return template.queryForObject(sql, this::mapRowToCat, id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("Unable to find selected category");
        }
    }

    @Override
    public List<Category> getCategoriesByPattern(int id) {
        String sql = "SELECT * FROM categories " +
                "JOIN pattern_categories ON categories.category_id = pattern_categories.category_id " +
                "WHERE pattern_id = ?";
        try {
            return template.query(sql, this::mapRowToCat, id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        }
    }

    @Override
    public Category createCategory(Category category) {
        String sql = "INSERT INTO categories (cat_name) VALUES (?) RETURNING category_id";
        try {
            int id = template.queryForObject(sql, Integer.class, category.getCategory_name());
            return getCategoryById(id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Unable to add category due to data integrity");
        }
    }

    private Category mapRowToCat(ResultSet set, int i) throws SQLException {
        Category category = new Category();
        category.setCategoryId(set.getInt("category_id"));
        category.setCategory_name(set.getString("cat_name"));
        return category;
    }
}
