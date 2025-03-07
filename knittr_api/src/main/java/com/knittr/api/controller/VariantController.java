package com.knittr.api.controller;

import com.knittr.api.dao.VariantDao;
import com.knittr.api.model.PatternVariant;
import com.knittr.api.model.dto.VariantDto;
import com.knittr.api.service.VariantService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@CrossOrigin
public class VariantController {
    private VariantDao dao;
    private VariantService service;

    @PostMapping("/variants")
    public PatternVariant add(@RequestBody VariantDto dto) {
        return service.add(dto);
    }
}
