package com.knittr.api.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Image {
    private int imageId;
    private String imageLink;
    private int patternId;
    private User submittedBy;
    private String desc;
}
