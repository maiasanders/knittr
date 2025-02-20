package com.knittr.api.controller;

import com.knittr.api.dao.PatternDao;
import com.knittr.api.model.Pattern;
import com.knittr.api.model.dto.PatternDto;
import com.knittr.api.service.PatternService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@CrossOrigin
@AllArgsConstructor
public class PatternController {
    private PatternDao dao;
    private PatternService service;

    @GetMapping("/patterns/{id}")
    public Pattern getPattern(@PathVariable int id) {
        return dao.getPatternById(id);
    }

    @GetMapping("/patterns")
    public List<Pattern> getPatterns() {
        return service.getPatterns();
    }

    @GetMapping("/users/{id}/patterns")
    public List<Pattern> getPatternsByUser(@PathVariable int id) {
        return dao.getPatternsByAuthor(id);
    }

    @GetMapping("/patterns/saved")
    public List<Pattern> getSavedPatterns(Principal principal) {
        return service.getSavedPatterns(principal);
    }

    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/patterns")
    public Pattern createPattern(Principal principal, @RequestBody @Valid PatternDto dto) {
        return service.createPattern(principal, dto);
    }
}
