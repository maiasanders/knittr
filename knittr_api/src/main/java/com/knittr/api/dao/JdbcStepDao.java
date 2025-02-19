package com.knittr.api.dao;

import com.knittr.api.exception.DaoException;
import com.knittr.api.exception.NotFoundException;
import com.knittr.api.model.Step;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@AllArgsConstructor
@Component
public class JdbcStepDao implements StepDao{
    private JdbcTemplate template;
    private RowDao rowDao;
    private final String CONNECT_ERR = "Unable to connect to database";
    @Override
    public Step createStep(Step step) {
        String sql = "INSERT INTO steps (pattern_id, yarn_id, size_id, title, step_num) " +
                "VALUES (?,?,?,?,?) RETURNING step_id";
        try {
            int id = template.queryForObject(sql, Integer.class, step.getPatternId(),
                    step.getYarnId(), step.getSizeId(), step.getTitle(), step.getStepNum());
            return getStepById(id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Unable to save step due to data integrity violation");
        }
    }

    @Override
    public List<Step> getStepsByProject(int id) {
        String sql = "SELECT * FROM steps AS s " +
                "JOIN projects AS p ON s.pattern_id = p.pattern_id " +
                "WHERE s.project_id = ? AND s.yarn_id = p.yarn_id AND s.size_id = p.size_id " +
                "ORDER BY step_num";
        try {
            List<Step> steps = template.query(sql, this::mapRowToStep, id);

            for (Step step : steps) {
                step.setRows( rowDao.getRowsByStep( step.getStepId() ) );
            }
            return steps;
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        }
    }

    private Step getStepById(int id) {
        String sql = "SELECT * FROM steps WHERE step_id = ?";
        try {
            Step step = template.queryForObject(sql, this::mapRowToStep, id);
            step.setRows(rowDao.getRowsByStep(id));
            return step;
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("Unable to find selected step");
        }
    }

    private Step mapRowToStep(ResultSet res, int row) throws SQLException {
        Step step = new Step();
        step.setStepId(res.getInt("step_id"));
        step.setPatternId(res.getInt("pattern_id"));
        step.setYarnId(res.getInt("yarn_id"));
        step.setSizeId(res.getInt("size_id"));
        step.setTitle(res.getString("title"));
        step.setStepNum(res.getInt("step_num"));
        return step;
    }
}
