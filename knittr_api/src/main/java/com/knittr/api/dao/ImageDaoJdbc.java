package com.knittr.api.dao;

import com.knittr.api.exception.DaoException;
import com.knittr.api.exception.NotFoundException;
import com.knittr.api.model.Image;
import com.knittr.api.model.User;
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
public class ImageDaoJdbc implements ImageDao{
    public final String SELECT_CLAUSE = "SELECT i.image_id, i.image_link, i.pattern_id, i.submitted_by, u.username, i.desc " +
            "FROM images AS i JOIN users AS u ON i.submitted_by = u.user_id ";
    private JdbcTemplate template;
    private final String CONNECT_ERR = "Unable to connect to database";
    @Override
    public Image addImage(Image image) {
        String sql = "INSERT INTO images (image_link, pattern_id, submitted_by, \"desc\") VALUES (?, ?, ?, ?) " +
                "RETURNING image_id";
        Image createdImage = null;

        try {
            int id = template.queryForObject(sql, Integer.class,
                    image.getImageLink(),
                    image.getPatternId(),
                    image.getSubmittedBy().getUserId(),
                    image.getDesc());
            return getImageById(id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Image unable to save due to data integrity");
        }
    }

    public Image getImageById(int id) {
        String sql = SELECT_CLAUSE +
                "WHERE image_id = ?";
        try {
            return template.queryForObject(sql, this::mapRowToImage, id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("No image found");
        }
    }

    @Override
    public List<Image> getImagesByPattern(int id) {
        String sql = SELECT_CLAUSE + "WHERE pattern_id = ?";

        try {
            return template.query(sql, this::mapRowToImage, id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("No images found");
        }
    }

    @Override
    public Image setDefaultImage(int imageId, int patternId) {
        String sql = "UPDATE patterns SET default_image = ? WHERE pattern_id = ?";
        try {
            int rows = template.update(sql, imageId, patternId);
            if (rows == 1) return getImageById(imageId);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Unable to set default image due to data integrity violation");
        }
        throw new DaoException("Trouble setting default image");
    }

    private Image mapRowToImage(ResultSet set, int rowNum) throws SQLException {
        Image image = new Image();
        image.setImageId(set.getInt("image_id"));
        image.setImageLink(set.getString("image_link"));
        image.setPatternId(set.getInt("pattern_id"));
        image.setDesc(set.getString("desc"));

        User user = new User();
        user.setUserId(set.getInt("submitted_by"));
        if (set.getString("username") != null) {
            user.setUsername(set.getString("username"));
        }
        image.setSubmittedBy(user);

        return image;
    }
}
