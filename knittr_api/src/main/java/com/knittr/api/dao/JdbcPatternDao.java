package com.knittr.api.dao;

import com.knittr.api.exception.DaoException;
import com.knittr.api.exception.NotFoundException;
import com.knittr.api.model.*;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Component
@AllArgsConstructor
public class JdbcPatternDao implements PatternDao{
    private JdbcTemplate template;

    private final String NOT_FOUND = "Unable to find pattern(s)";
    private final String CONNECT_ERR = "Unable to Connect";
    private final String SELECT_CLAUSE = "SELECT p.pattern_id, p.author, u.username, p.pattern_name, p.desc, p.public, " +
            "i.image_id, i.image_link, i.desc " +
            "STRING_AGG(c.category_id, ',') AS cat_ids, STRING_AGG(c.cat_names, ',') AS cat_names " +
            "STRING_AGG(st.yarn_id, ',') AS yarn_ids, STRING_AGG(y.yarn_name, ',') AS yarn_names " +
            "STRING_AGG(st.size_id, ',') AS size_ids, STRING_AGG(s.size_name, ',') AS size_names, " +
            "STRING_AGG(s.age_category, ',') AS age_cats " +
            "FROM patterns AS p JOIN users AS u ON patterns.author = users.user_id " +
            "JOIN pattern_categories AS pc ON pc.pattern_id = p.pattern_id " +
            "JOIN categories AS c ON c.category_id = pc.category_id " +
            "JOIN steps AS st ON p.pattern_id = st.pattern_id " +
            "JOIN yarn_type AS y ON st.yarn_id = y.yarn_id " +
            "JOIN sizes AS s ON st.size_id = sizes.size_id " +
            "JOIN images AS i ON p.default_image = i.image_id ";
//    TODO add order = 1 to WHERE clause to remove duplicate yarn/size combos?

    @Override
    public Pattern getPatternById(int id) {
        String sql = SELECT_CLAUSE +
                "WHERE pattern_id = ?";

        try {
            return template.queryForObject(sql, this::mapRowToPattern, id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException(NOT_FOUND);
        }
    }

    @Override
    public List<Pattern> getPatternsByAuthor(int id) {
        String sql = SELECT_CLAUSE + "WHERE author_id = ?";
        try {
            return template.query(sql, this::mapRowToPattern, id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException(NOT_FOUND);
        }
    }

    @Override
    public List<Pattern> getSavedPatternsByUserId(int userId) {
        String sql = SELECT_CLAUSE +
                "JOIN user_patterns AS up ON p.pattern_id = up.pattern_id " +
                "WHERE up.user_id = ?";
        try {
            return template.query(sql, this::mapRowToPattern, userId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException(NOT_FOUND);
        }
    }

    @Override
    public Pattern createPattern(Pattern pattern) {
        String sql = "INSERT INTO patterns (author, pattern_name, desc) VALUES (?, ?, ?) RETURNING pattern_id;";

        try {
            int id = template.queryForObject(sql, Integer.class, pattern.getAuthor().getUserId(), pattern.getName(), pattern.getDesc());

            // iterate through categories and add to join table
            for (Category category : pattern.getCategories()) {
                addCatToPattern(id, category);
            }

            return getPatternById(id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Unable to add pattern due to data integrity violation");
        }
    }

    private void addCatToPattern(int id, Category category) {
        String sql = "INSERT INTO pattern_categories (pattern_id, category_id) VALUES (?, ?);";
        try {
            template.update(sql, id, category.getCategoryId());
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Unable to add category due to data integrity violation");
        }
    }

    @Override
    public List<Pattern> getPatterns() {
        String sql = SELECT_CLAUSE + "ORDER BY pattern_id LIMIT 20";
        try {
            return template.query(sql, this::mapRowToPattern);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        }
    }

    @Override
    public List<Pattern> getPatterns(int offset) {
        String sql = SELECT_CLAUSE + "WHERE pattern_id > ? ORDER BY pattern_id LIMIT 20";
        try {
            return template.query(sql, this::mapRowToPattern, offset);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        }
    }

    private Pattern mapRowToPattern(ResultSet set, int rowNum) throws SQLException {
        Pattern pattern = new Pattern();
        pattern.setPatternId(set.getInt("pattern_id"));
        pattern.setName(set.getString("pattern_name"));
        pattern.setDesc(set.getString("desc"));
        pattern.setPublic(set.getBoolean("public"));

        // Create a user instance to assign to author
        User user = new User();
        user.setUserId(set.getInt("author"));
        user.setUsername(set.getString("username"));
        pattern.setAuthor(user);

        // Process and match up ids and names for categories to add to list
        List<Category> categories = new ArrayList<>();
        String[] catIds = set.getString("cat_ids").split(",");
        String[] catNames = set.getString("cat_names").split(",");
        for (int i = 0; i < catIds.length; i++) {
            categories.add(new Category(
                    Integer.parseInt(catIds[i]),
                    catNames[i]
            ));
        }
        pattern.setCategories(categories);

        // process and match info to add sizes to list
        List<Size> sizes = new ArrayList<>();
        String[] sizeIds  = set.getString("size_ids").split(",");
        String[] sizeNames = set.getString("size_names").split(",");
        String[] ageCats = set.getString("age_cats").split(",");
        for (int i = 0; i < sizeIds.length; i++) {
            sizes.add(new Size(
                    Integer.parseInt(sizeIds[i]), sizeNames[i], ageCats[i]
            ));
        }
        pattern.setSizes(sizes);

        // process and match info to add yarns to list
        List<Yarn> yarns = new ArrayList<>();
        String[] yarnIds = set.getString("yarn_ids").split(",");
        String[] yarnNames = set.getString("yarn_names").split(",");
        for (int i = 0; i < yarnIds.length; i++) {
            yarns.add( new Yarn( Integer.parseInt( yarnIds[i] ), yarnNames[i] ) );
        }
        pattern.setYarns(yarns);

        // process and set default image
        Image image = new Image();
        image.setImageId(set.getInt("i.image_id"));
        image.setImageLink(set.getString("i.image_link"));
        image.setDesc(set.getString("i.desc"));
        pattern.setDefaultImage(image);

        return pattern;
    }
}
