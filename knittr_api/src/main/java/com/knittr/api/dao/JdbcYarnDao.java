package com.knittr.api.dao;

import com.knittr.api.exception.DaoException;
import com.knittr.api.model.Yarn;
import lombok.AllArgsConstructor;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Component
@AllArgsConstructor
public class JdbcYarnDao implements YarnDao{
    private JdbcTemplate template;
    @Override
    public List<Yarn> getYarns() {
        String sql = "SELECT * FROM yarn_types";
        try {
            return template.query(sql, this::mapToYarn);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect to database");
        }
    }

    private Yarn mapToYarn(ResultSet set, int rowNum) throws SQLException {
        Yarn yarn = new Yarn();
        yarn.setYarnId(set.getInt("yarn_id"));
        yarn.setName(set.getString("yarn_name"));
        return yarn;
    }
}
