package com.knittr.api.dao;

import com.knittr.api.model.Row;

import java.util.List;

public interface RowDao {
    List<Row> getRowsByStep(int id);

    Row createRow(Row row);
    Row getRowById(int id);
}
