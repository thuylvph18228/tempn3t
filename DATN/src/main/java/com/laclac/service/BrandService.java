package com.laclac.service;

import com.laclac.DTO.BrandDto;
import com.laclac.entity.Brand;

import java.util.List;


public interface BrandService {

    List<Brand> getAll();
    Brand getById(int brandId);
    Brand save(Brand brand);
    Brand update(Brand brand);
    Brand delete(int id);

    BrandDto save(BrandDto brandDto);
}
