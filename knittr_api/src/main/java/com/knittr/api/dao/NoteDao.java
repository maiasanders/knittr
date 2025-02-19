package com.knittr.api.dao;

import com.knittr.api.model.Note;

import java.util.List;

public interface NoteDao {
    Note getNoteById(int id);
    Note createNote(Note newNote);

    Note updateNote(Note note);

    void deleteNote(int id);

    List<Note> getNotesByProject(int id);
}
