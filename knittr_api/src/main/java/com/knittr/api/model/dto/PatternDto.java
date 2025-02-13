package com.knittr.api.model.dto;

import com.knittr.api.model.Category;
import com.knittr.api.model.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.lang.NonNull;

import java.util.List;

@AllArgsConstructor
@Getter
public class PatternDto {
    @NonNull
    private String name;
    @NonNull
    private String desc;
    private List<Category> categories;
    private List<Size> sizes;
}
