package com.knittr.api.dao;

import com.knittr.api.exception.DaoException;
import com.knittr.api.exception.NotFoundException;
import com.knittr.api.model.PatternVariant;
import com.knittr.api.model.Size;
import com.knittr.api.model.Yarn;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
@AllArgsConstructor
public class JdbcVariantDao implements VariantDao{
    private JdbcTemplate template;
    private final String CONNECT_ERR = "Unable to connect to database";

    public PatternVariant getVariantById(int id) {
        String sql = "SELECT v.variant_id, v.pattern_id, v.yarn_id, v.size_id, " +
                "y.yarn_name, s.size_name, s.age_category " +
                "FROM pattern_variants AS v " +
                "JOIN sizes AS s ON v.size_id = s.size_id " +
                "JOIN yarn_types AS y ON v.yarn_id = y.yarn_id " +
                "WHERE v.variant_id = ?";
        try {
            return template.queryForObject(sql, this::mapRowToVariant, id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("This variant does not exist");
        }
    }
    @Override
    public PatternVariant addVariant(PatternVariant variant) {
        String sql = "INSERT INTO pattern_variants (pattern_id, yarn_id, size_id) " +
                "VALUES (?,?,?) RETURNING variant_id";
        try {
            int id = template.queryForObject(sql, Integer.class,
                    variant.getPatternId(),
                    variant.getYarn().getYarnId(),
                    variant.getSize().getSizeId());
            return getVariantById(id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Unable to create new variant. This variant already exists; or selected size, pattern, or yarn does not exist");
        }
    }

    private PatternVariant mapRowToVariant (ResultSet res, int rowNum) throws SQLException {
        PatternVariant variant = new PatternVariant();
        variant.setVariantId(res.getInt("variant_id"));
        variant.setPatternId(res.getInt("pattern_id"));

        Yarn yarn = new Yarn();
        yarn.setYarnId(res.getInt("yarn_id"));
        yarn.setName(res.getString("yarn_name"));
        variant.setYarn(yarn);

        Size size = new Size();
        size.setSizeId(res.getInt("size_id"));
        size.setName(res.getString("size_name"));
        if (res.getString("age_category") != null) {
            size.setAgeRange(res.getString("age_category"));
        }
        variant.setSize(size);

        return variant;
    }
}
