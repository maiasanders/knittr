package com.knittr.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


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
    private Image defaultImage;
//    private List<Size> sizes;
//    private List<Yarn> yarns;
    private List<PatternVariant> variants;
}
