package com.knittr.api.controller;

import com.knittr.api.model.Row;
import com.knittr.api.service.RowService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@Component
@RestController
@AllArgsConstructor
@CrossOrigin
@PreAuthorize("isAuthenticated()")
public class RowController {
    private RowService service;

    public Row addRow(@RequestBody Row row, Principal principal) {
        return service.addRow(principal, row);
    }
}
