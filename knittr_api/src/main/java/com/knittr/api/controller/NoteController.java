package com.knittr.api.controller;

import com.knittr.api.dao.NoteDao;
import com.knittr.api.model.Note;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Component
@AllArgsConstructor
@Controller("/notes")
public class NoteController {
    private NoteDao dao;

    @PostMapping
    public Note addNote(@RequestBody Note newNote) {
        return dao.createNote(newNote);
    }

    @PutMapping("/{id}")
    public Note editNote(@PathVariable int id, @RequestBody Note note) {
        note.setNoteId(id);
        return dao.updateNote(note);
    }

    @DeleteMapping("/{id}")
    public void deleteNote(@PathVariable int id) {
        dao.deleteNote(id);
    }
}
