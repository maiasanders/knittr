package com.knittr.api.dao;

import com.knittr.api.exception.DaoException;
import com.knittr.api.exception.NotFoundException;
import com.knittr.api.model.User;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;

@Component
@AllArgsConstructor
public class UserDaoJdbc implements UserDao {

    private final JdbcTemplate template;

    @Override
    public User getUserById(int id) {

        User user = null;
        String sql = "SELECT * FROM users WHERE user_id = ?";

        try {
            return template.queryForObject(sql, this::mapRowToUser, id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect");
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("User does not exist");
        }

    }

    @Override
    public User getUserByName(String name) {

        String sql = "SELECT * FROM users WHERE username = ?";
        User user = null;

        try {
            return template.queryForObject(sql, this::mapRowToUser, name);

        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect");
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException("User does not exist");
        }
    }

    @Override
    public User createUser(User user) {
        User returnedUser = null;

        String sql = "INSERT INTO users (username, password_hash) VALUES (?, ?) RETURNING user_id;";

        if (user.getPassword() == null) throw new DaoException("Password can not be null");

        try {
//            String passwordHash = new BCryptPasswordEncoder().encode(user.getPassword());

            int id = template.queryForObject(sql, Integer.class, user.getUsername(), user.getPassword());
            return getUserById(id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect");
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }
    }

    private User mapRowToUser(ResultSet rs, int rowNum) throws SQLException {
        User user = new User();
        user.setUserId(rs.getInt("user_id"));
        user.setUsername(rs.getString("username"));
        user.setPassword(rs.getString("password_hash"));
        return user;
    }
}
