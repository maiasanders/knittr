package com.knittr.api.controller;

import com.knittr.api.dao.ImageDao;
import com.knittr.api.model.Image;
import com.knittr.api.model.dto.DefaultImageDto;
import com.knittr.api.model.dto.ImageDto;
import com.knittr.api.service.ImageService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@AllArgsConstructor
@RestController
@CrossOrigin
public class ImageController {
    private ImageDao dao;
    private ImageService service;

    @PreAuthorize("isAuthenticated()")
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/images")
    @CrossOrigin
    public Image addImage(Principal principal, @RequestBody @Valid ImageDto dto) {
        return service.addImage(principal, dto);
    }

    @GetMapping("/patterns/{id}/images")
    public List<Image> getImagesByPattern(@PathVariable int id) {
        return dao.getImagesByPattern(id);
    }

    @PutMapping("/images/default")
    public Image setDefaultImage(Principal principal, @RequestBody DefaultImageDto dto) {
        return service.setDefaultImage(principal, dto);
    }
}
