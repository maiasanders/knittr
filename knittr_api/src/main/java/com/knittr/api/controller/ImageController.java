package com.knittr.api.controller;

import com.knittr.api.dao.ImageDao;
import com.knittr.api.model.Image;
import com.knittr.api.model.dto.ImageDto;
import com.knittr.api.service.ImageService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;
import java.util.List;

@AllArgsConstructor
@Controller
public class ImageController {
    private ImageDao dao;
    private ImageService service;

    @PostMapping("/images")
    public Image addImage(Principal principal, @RequestBody @Valid ImageDto dto) {
        return service.addImage(principal, dto);
    }

    @GetMapping("/patterns/{id}/images")
    public List<Image> getImagesByPattern(@PathVariable int id) {
        return dao.getImagesByPattern(id);
    }
}
