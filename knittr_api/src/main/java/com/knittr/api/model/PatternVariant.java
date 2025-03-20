package com.knittr.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PatternVariant {
    private int variantId;
    private Size size;
    private Yarn yarn;
    private int patternId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PatternVariant variant = (PatternVariant) o;

        if (variantId != variant.variantId) return false;
        if (patternId != variant.patternId) return false;
        if (size.getSizeId() != variant.size.getSizeId()) return false;
        return yarn.getYarnId() == variant.yarn.getYarnId();
    }

    @Override
    public int hashCode() {
        int result = variantId;
        result = 31 * result + size.getSizeId();
        result = 31 * result + yarn.getYarnId();
        result = 31 * result + patternId;
        return result;
    }
}
