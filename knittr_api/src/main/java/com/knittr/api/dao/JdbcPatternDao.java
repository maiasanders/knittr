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
import java.util.*;

@Component
@AllArgsConstructor
public class JdbcPatternDao implements PatternDao{
    private JdbcTemplate template;
    private ImageDao imageDao;

    private final String NOT_FOUND = "Unable to find pattern(s)";
    private final String CONNECT_ERR = "Unable to Connect";
//    TODO fix to work with new variant class
    private final String SELECT_CLAUSE = "SELECT p.pattern_id, p.author, u.username, p.pattern_name, p.desc AS pattern_desc, p.public, " +
            "p.default_image, " +
            "STRING_AGG(CAST(v.variant_id AS VARCHAR), ',') AS var_ids, " +
            "STRING_AGG(CAST(c.category_id AS VARCHAR), ',') AS cat_ids, STRING_AGG(c.cat_name, ',') AS cat_names, " +
            "STRING_AGG(CAST(v.yarn_id AS VARCHAR), ',') AS yarn_ids, STRING_AGG(y.yarn_name, ',') AS yarn_names, " +
            "STRING_AGG(CAST(v.size_id AS VARCHAR), ',') AS size_ids, STRING_AGG(s.size_name, ',') AS size_names, " +
            "STRING_AGG(s.age_category, ',') AS age_cats " +
            "FROM patterns AS p " +
            "LEFT JOIN users AS u ON p.author = u.user_id " +
            "LEFT JOIN pattern_categories AS pc ON pc.pattern_id = p.pattern_id " +
            "LEFT JOIN categories AS c ON c.category_id = pc.category_id " +
            "LEFT JOIN pattern_variants AS v ON p.pattern_id = v.pattern_id " +
            "LEFT JOIN yarn_types AS y ON v.yarn_id = y.yarn_id " +
            "LEFT JOIN sizes AS s ON v.size_id = s.size_id ";
    private final String GROUP_CLAUSE = " GROUP BY p.pattern_id, u.username ";
//    TODO add order = 1 to WHERE clause to remove duplicate yarn/size combos?

    @Override
    public Pattern getPatternById(int id) {
        String sql = SELECT_CLAUSE + "WHERE p.pattern_id = ?" + GROUP_CLAUSE;

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
        String sql = SELECT_CLAUSE + "WHERE author = ?" + GROUP_CLAUSE;
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
                "WHERE up.user_id = ?" + GROUP_CLAUSE;
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
        String sql = "INSERT INTO patterns (author, pattern_name, \"desc\") VALUES (?, ?, ?) RETURNING pattern_id;";

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
        String sql = SELECT_CLAUSE + GROUP_CLAUSE + "ORDER BY p.pattern_id LIMIT 20";
        try {
            return template.query(sql, this::mapRowToPattern);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        }
    }

    @Override
    public List<Pattern> getPatterns(int offset) {
        String sql = SELECT_CLAUSE + "WHERE p.pattern_id > ?" + GROUP_CLAUSE + "ORDER BY p.pattern_id LIMIT 20";
        try {
            return template.query(sql, this::mapRowToPattern, offset);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        }
    }

    @Override
    public void savePattern(int userId, int patternId) {
        String sql = "INSERT INTO user_patterns (user_id, pattern_id) VALUES (?, ?)";
        try {
            template.update(sql, userId, patternId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Unable to save pattern due to data integrity violation");
        }
    }

    @Override
    public void unsavePattern(int userId, int patternId) {
        String sql = "DELETE FROM user_patterns WHERE user_id = ? AND pattern_id = ?";
        try {
            template.update(sql, userId, patternId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (DataIntegrityViolationException e){
            throw new DaoException("Unable to unsave pattern due to data integrity violation");
        }
    }

    @Override
    public Pattern getPatternByVariant(int variantId) {
        String sql = SELECT_CLAUSE + "WHERE v.variant_id = ?" + GROUP_CLAUSE;
        try {
            return template.queryForObject(sql, this::mapRowToPattern, variantId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("Unable to find the variant or pattern");
        }
    }

    private Pattern mapRowToPattern(ResultSet set, int rowNum) throws SQLException {
        Pattern pattern = new Pattern();
        pattern.setPatternId(set.getInt("pattern_id"));
        pattern.setName(set.getString("pattern_name"));
        pattern.setDesc(set.getString("pattern_desc"));
        pattern.setPublic(set.getBoolean("public"));

        // Create a user instance to assign to author
        User user = new User();
        user.setUserId(set.getInt("author"));
        user.setUsername(set.getString("username"));
        pattern.setAuthor(user);

        List<PatternVariant> variants = new ArrayList<>();
        if (set.getString("var_ids") != null) {
            String[] varIds = set.getString("var_ids").split(",");
            String[] yarnIds = set.getString("yarn_ids").split(",");
            String[] yarnNames = set.getString("yarn_names").split(",");
            String[] sizeIds = set.getString("size_ids").split(",");
            String[] sizeNames = set.getString("size_names").split(",");
            String[] ageCats = null;
            if (set.getString("age_cats") != null) {
                ageCats = set.getString("age_cats").split(",");
            }
            for (int i = 0; i < varIds.length; i++) {
                Size size = new Size();
                size.setSizeId(Integer.parseInt(sizeIds[i]));
                size.setName(sizeNames[i]);
                if (ageCats != null) size.setAgeRange(ageCats[i]);

                Yarn yarn = new Yarn(
                        Integer.parseInt(yarnIds[i]),
                        yarnNames[i]
                );
                variants.add(new PatternVariant(
                        Integer.parseInt(varIds[i]),
                        size,
                        yarn,
                        pattern.getPatternId()
                ));
            }
        }
        pattern.setVariants(variants);

        // Process and match up ids and names for categories to add to list
        Set<Category> uniqueCats = new HashSet<>();
        if (set.getString("cat_ids") != null) {
            String[] catIds = set.getString("cat_ids").split(",");
            String[] catNames = set.getString("cat_names").split(",");
            for (int i = 0; i < catIds.length; i++) {
                Category cat = new Category(
                        Integer.parseInt(catIds[i]),
                        catNames[i]
                );
                uniqueCats.add(cat);
            }
        }
        List<Category> categories = new ArrayList<>(uniqueCats);

        pattern.setCategories(categories);


        // process and match info to add sizes to list
        List<Size> sizes = new ArrayList<>();
        if (set.getString("size_ids") != null) {
            String[] sizeIds = set.getString("size_ids").split(",");
            String[] sizeNames = set.getString("size_names").split(",");
            String[] ageCats = new String[sizeIds.length];
            if (set.getString("age_cats") != null)  ageCats = set.getString("age_cats").split(",");


            for (int i = 0; i < sizeIds.length; i++) {
                sizes.add(new Size(
                        Integer.parseInt(sizeIds[i]), sizeNames[i], ageCats[i]
                ));
            }
        }
        pattern.setSizes(sizes);

        // process and match info to add yarns to list
        List<Yarn> yarns = new ArrayList<>();
        if (set.getString("yarn_ids") != null) {
            String[] yarnIds = set.getString("yarn_ids").split(",");
            String[] yarnNames = set.getString("yarn_names").split(",");
            for (int i = 0; i < yarnIds.length; i++) {
                yarns.add(new Yarn(Integer.parseInt(yarnIds[i]), yarnNames[i]));
            }
        }
        pattern.setYarns(yarns);

        // process and set default image
        if (set.getInt("default_image") != 0) {
            pattern.setDefaultImage(imageDao.getImageById(set.getInt("default_image")));
        }

        return pattern;
    }

}
