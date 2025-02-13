package com.knittr.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Pattern {
    private int patternId;
    private String name;
    private User author;
    private String desc;
    private boolean isPublic;
    private List<Category> categories;
    private List<Image> images;
    private List<Size> sizes;
}
