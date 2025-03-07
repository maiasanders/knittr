package com.knittr.api.dao;

import com.knittr.api.model.Pattern;

import java.util.List;

public interface PatternDao {
    Pattern getPatternById(int id);

    List<Pattern> getPatternsByAuthor(int id);

    List<Pattern> getSavedPatternsByUserId(int userId);

    Pattern createPattern(Pattern pattern);

    List<Pattern> getPatterns();

    List<Pattern> getPatterns(int offset);

    void savePattern(int userId, int patternId);

    void unsavePattern(int userId, int patternId);

    Pattern getPatternByVariant(int variantId);
}
