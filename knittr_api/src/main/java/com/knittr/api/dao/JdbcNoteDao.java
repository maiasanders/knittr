package com.knittr.api.dao;

import com.knittr.api.exception.DaoException;
import com.knittr.api.exception.NotFoundException;
import com.knittr.api.model.Note;
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
public class JdbcNoteDao implements NoteDao {

    private JdbcTemplate template;
    private final String CONNECT_ERR = "Unable to Connect";
    private final String NOT_FOUND = "Unable to find note";

    @Override
    public Note getNoteById(int id) {
        String sql = "SELECT * FROM notes WHERE note_id = ?";
        try {
            return template.queryForObject(sql, this::mapRowToNote, id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (EmptyResultDataAccessException e) {
            throw new NotFoundException(NOT_FOUND);
        }
    }

    @Override
    public Note createNote(Note newNote) {
        Note note = null;
        String sql = "INSERT INTO notes (project_id, note_body) VALUES (?, ?) RETURNING note_id";

        try {
            int id = template.queryForObject(sql, Integer.class, newNote.getProjectId(), newNote.getBody());
            note = getNoteById(id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Cannot add note due to data integrity violation");
        }

        return note;
    }

    @Override
    public Note updateNote(Note note) {
        String sql = "UPDATE notes SET note_body = ? WHERE note_id = ?";

        try {
            int rows = template.update(sql, note.getBody(), note.getNoteId());
            if (rows > 0) {
                return getNoteById(note.getNoteId());
            } else {
                throw new NotFoundException(NOT_FOUND);
            }
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Cannot update note due to data integrity violation");
        }
    }

    @Override
    public void deleteNote(int id) {
        String sql = "DELETE FROM notes WHERE note_id = ?";

        try {
            template.update(sql, id);
        } catch (CannotGetJdbcConnectionException e) {
            throw new DaoException(CONNECT_ERR);
        } catch (DataIntegrityViolationException e) {
            throw new DaoException("Cannot delete note due to data integrity violation");
        }
    }

    private Note mapRowToNote(ResultSet set, int id) throws SQLException {
        Note note = new Note();
        note.setNoteId(set.getInt("note_id"));
        note.setBody(set.getString("note_body"));
        note.setProjectId(set.getInt("project_id"));
        return note;
    }
}
