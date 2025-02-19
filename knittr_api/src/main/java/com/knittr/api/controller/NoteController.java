package com.knittr.api.controller;

import com.knittr.api.dao.NoteDao;
import com.knittr.api.model.Note;
import com.knittr.api.service.NoteService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Component
@AllArgsConstructor
@RestController
@RequestMapping
@CrossOrigin
@PreAuthorize("isAuthenticated()")
public class NoteController {
    private NoteDao dao;
    private NoteService service;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/notes")
    public Note addNote(@RequestBody Note newNote, Principal principal) {
        return service.createNote(newNote, principal);
    }

    @PutMapping("/notes/{id}")
    public Note editNote(@PathVariable int id, @RequestBody Note note, Principal principal) {
        return service.editNote(id, note, principal);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/notes/{id}")
    public void deleteNote(@PathVariable int id, Principal principal) {
        service.deleteNote(id, principal);
    }

    @GetMapping("/projects/{id}/notes")
    public List<Note> getNotesByProject(@PathVariable int id, Principal principal) {
        return service.getNotesByProject(id, principal);
    }
}
