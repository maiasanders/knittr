package com.knittr.api.dao;

import com.knittr.api.exception.DaoException;
import com.knittr.api.exception.NotFoundException;
import com.knittr.api.model.Row;
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
public class JdbcRowDao implements RowDao {
    private JdbcTemplate template;
    private final String CONNECT_ERR = "Unable to connect to database";
    @Override
    public List<Row> getRowsByStep(int id) {
        String sql = "SELECT * FROM rows WHERE step_id = ? ORDER BY row_num";
        try {
            return template.query(sql, this::mapRow, id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        }
    }

    @Override
    public Row createRow(Row row) {
        String sql = "INSERT INTO rows (step_id, directions, row_num) VALUES (?,?,?) RETURNING row_id";
        try {
            int id = template.queryForObject(sql, Integer.class, row.getStepId(), row.getDirections(), row.getRowNum());
            return getRowById(id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Unable to save row due to data integrity violation");
        }
    }

    public Row getRowById(int id) {
        String sql = "SELECT * FROM rows WHERE row_id = ?";
        try {
            return template.queryForObject(sql, this::mapRow, id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("Row does not exist in DB");
        }
    }

    private Row mapRow(ResultSet res, int n) throws SQLException {
        Row row = new Row();
        row.setRowId(res.getInt("row_id"));
        row.setStepId(res.getInt("step_id"));
        row.setDirections(res.getString("directions"));
        row.setRowNum(res.getInt("row_num"));
        return row;
    }
}
