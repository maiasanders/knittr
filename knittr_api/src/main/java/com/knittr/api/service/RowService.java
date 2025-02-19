package com.knittr.api.service;

import com.knittr.api.dao.RowDao;
import com.knittr.api.model.Row;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.security.Principal;

@Component
@AllArgsConstructor
public class RowService {
    private RowDao dao;

    public Row addRow(Principal principal, Row row) {
//        TODO add validation that user is accessing own pattern

        return dao.createRow(row);
    }
}
