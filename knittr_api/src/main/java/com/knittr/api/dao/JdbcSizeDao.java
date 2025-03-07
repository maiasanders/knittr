package com.knittr.api.dao;

import com.knittr.api.exception.DaoException;
import com.knittr.api.model.Size;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Component
@AllArgsConstructor
public class JdbcSizeDao implements SizeDao{
    private JdbcTemplate template;
    @Override
    public List<Size> getSizes() {
        String sql = "SELECT * FROM sizes";
        try {
            return template.query(sql, this::mapToSize);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to database");
        }
    }

    private Size mapToSize(ResultSet res, int rowNum) throws SQLException {
        Size size = new Size();
        size.setSizeId(res.getInt("size_id"));
        size.setName(res.getString("size_name"));
        if (res.getString("age_category") != null) {
            size.setAgeRange(res.getString("age_category"));
        }
        return size;
    }
}
