package com.knittr.api.service;

import com.knittr.api.dao.VariantDao;
import com.knittr.api.model.PatternVariant;
import com.knittr.api.model.Size;
import com.knittr.api.model.Yarn;
import com.knittr.api.model.dto.VariantDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class VariantService {
    private VariantDao dao;

    public PatternVariant add(VariantDto dto) {
        return dao.addVariant(mapDtoToVariant(dto));
    }

    private PatternVariant mapDtoToVariant(VariantDto dto) {
        PatternVariant variant = new PatternVariant();
        Size size = new Size();
        size.setSizeId(dto.getSizeId());
        variant.setSize(size);
        Yarn yarn = new Yarn();
        yarn.setYarnId(dto.getYarnId());
        variant.setYarn(yarn);
        variant.setPatternId(dto.getPatternId());
        return variant;
    }
}
