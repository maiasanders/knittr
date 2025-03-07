package com.knittr.api.controller;

import com.knittr.api.dao.YarnDao;
import com.knittr.api.model.Yarn;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@AllArgsConstructor
public class YarnController {
    private YarnDao dao;

    @GetMapping("/yarns")
    public List<Yarn> get() {
        return dao.getYarns();
    }
}
