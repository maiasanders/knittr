package com.knittr.api.dao;

import com.knittr.api.exception.DaoException;
import com.knittr.api.model.User;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.jdbc.CannotGetJdbcConnectionException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class UserDaoJdbc implements UserDao {

    private final JdbcTemplate template;

    @Override
    public User getUserById(int id) {

        User user = null;
        String sql = "SELECT * FROM users WHERE user_id = ?";

        try {
            SqlRowSet res = template.queryForRowSet(sql, id);
            if (res.next()) {
                user = mapRowToUser(res);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect");
        }

        return user;
    }

    @Override
    public User getUserByName(String name) {

        String sql = "SELECT * FROM users WHERE username = ?";
        User user = null;

        try {
            SqlRowSet res = template.queryForRowSet(sql, name);
            if (res.next()) user = mapRowToUser(res);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect");
        }
        return null;
    }

    @Override
    public User createUser(User user) {
        User returnedUser = null;

        String sql = "INSERT INTO users (username, password_hash) VALUES (?, ?)";

        if (user.getPassword() == null) throw new DaoException("Password can not be null");

        try {
            String passwordHash = new BCryptPasswordEncoder().encode(user.getPassword());

            int id = template.queryForObject(sql, int.class, user.getUsername(), passwordHash);
            returnedUser = getUserById(id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException("Unable to connect");
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Data integrity violation", e);
        }
        return null;
    }

    private User mapRowToUser(SqlRowSet rs) {
        User user = new User();
        user.setUserId(rs.getInt("user_id"));
        user.setUsername(rs.getString("username"));
        user.setPassword(rs.getString("password_hash"));
        return user;
    }
}
