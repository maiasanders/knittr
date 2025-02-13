package com.knittr.api.dao;

import com.knittr.api.exception.DaoException;
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

@Component
@AllArgsConstructor
public class ImageDaoJdbc implements ImageDao{
    private JdbcTemplate template;
    @Override
    public Image addImage(Image image) {
        String sql = "INSERT INTO images (image_link, pattern_id, submitted_by, desc) VALUES (?, ?, ?, ?)";
        Image createdImage = null;

        try {
            int id = template.queryForObject(sql, Integer.class, image.getImageLink(), image.getPatternId(), image.getSubmittedBy().getUserId(), image.getDesc());
            return getImageById(id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect");
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Image unable to save due to data integrity");
        }
    }

    public Image getImageById(int id) {
        String sql = "SELECT image_id, image_link, pattern_id, submitted_by, username, desc " +
                "FROM images JOIN users ON images.submitted_by = users.user_id " +
                "WHERE image_id = ?";
        try {
            return template.queryForObject(sql, this::mapRowToImage, id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to Connect");
        } catch (EmptyResultDataAccessException e) {
            throw new DaoException("No image found");
        }
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
