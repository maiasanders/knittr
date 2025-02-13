package com.knittr.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Note {

    private int noteId;
    private String body;
    private int projectId;

    public Note(String body, int projectId) {
        this.body = body;
        this.projectId = projectId;
    }
}
