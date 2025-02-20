package com.knittr.api.controller;

import com.knittr.api.model.Row;
import com.knittr.api.service.RowService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Component
@RestController
@AllArgsConstructor
@CrossOrigin
@PreAuthorize("isAuthenticated()")
@RequestMapping("/rows")
public class RowController {
    private RowService service;

    @PostMapping
    public Row addRow(@RequestBody Row row, Principal principal) {
        return service.addRow(principal, row);
    }
}
