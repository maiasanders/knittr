package com.knittr.api.controller;

import com.knittr.api.dao.SizeDao;
import com.knittr.api.model.Size;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/sizes")
public class SizeController {
    private SizeDao dao;
    @GetMapping
    public List<Size> get() {
        return dao.getSizes();
    }
}
