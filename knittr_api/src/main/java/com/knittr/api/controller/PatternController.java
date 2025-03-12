package com.knittr.api.controller;

import com.knittr.api.dao.PatternDao;
import com.knittr.api.exception.NotFoundException;
import com.knittr.api.model.Pattern;
import com.knittr.api.model.dto.PatternDto;
import com.knittr.api.service.PatternService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

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
        try {
            return dao.getPatternById(id);
        } catch (NotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @GetMapping("/patterns")
    public List<Pattern> getPatterns() {
        return service.getPatterns();
    }

    /**
     * Gets patterns created by logged-in user
     * @param principal user
     * @return list of patterns
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/patterns/mine")
    public List<Pattern> getPatternsByUser(Principal principal) {
        return service.getPatternsByAuthor(principal);
    }

    @PreAuthorize("isAuthenticated()")
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

    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/patterns/{id}/save")
    public void savePattern(Principal principal, @PathVariable int id) {
        service.savePattern(principal, id);
    }

    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/patterns/{id}/save")
    public void unsavePattern(Principal principal, @PathVariable int id) {
        service.unsavePattern(principal, id);
    }
}
