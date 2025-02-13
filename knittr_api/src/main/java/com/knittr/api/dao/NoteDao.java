package com.knittr.api.dao;

import com.knittr.api.model.Note;

public interface NoteDao {
    Note getNoteById(int id);
    Note createNote(Note newNote);

    Note updateNote(Note note);

    void deleteNote(int id);
}
