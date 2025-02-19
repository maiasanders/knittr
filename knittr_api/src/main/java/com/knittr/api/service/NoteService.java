package com.knittr.api.service;

import com.knittr.api.dao.NoteDao;
import com.knittr.api.dao.ProjectDao;
import com.knittr.api.dao.UserDao;
import com.knittr.api.model.Note;
import com.knittr.api.model.Project;
import com.knittr.api.model.User;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.security.Principal;
import java.util.List;

@Component
@AllArgsConstructor
public class NoteService {
    private UserDao userDao;
    private ProjectDao projectDao;
    private NoteDao dao;
    public List<Note> getNotesByProject(int id, Principal principal) {
        if (isMaker(principal, id)) {
            return dao.getNotesByProject(id);
        } else {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }

    private boolean isMaker(Principal principal, int projectId) {
        User user = userDao.getUserByName(principal.getName());
        Project project = projectDao.getProjectById(projectId);

        return user.getUserId() == project.getMakerId();
    }

    public Note createNote(Note note, Principal principal) {
        if ( isMaker(principal, note.getProjectId()) ) {
            return dao.createNote(note);
        } else {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }

    public Note editNote(int id, Note note, Principal principal) {
        if ( isMaker(principal, note.getProjectId())) {
            note.setNoteId(id);
            return dao.updateNote(note);
        } else {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }

    public void deleteNote(int id, Principal principal) {
        Note note = dao.getNoteById(id);
        if ( isMaker( principal, note.getProjectId() ) ) {
            dao.deleteNote(id);
        } else {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }
}
