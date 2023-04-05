package com.n3t.service;

import com.n3t.DTO.BrandDto;
import com.n3t.entity.Brand;

import java.util.List;


public interface BrandService {

    List<Brand> getAll();
    Brand getById(int brandId);
    Brand save(Brand brand);
    Brand update(Brand brand);
    Brand delete(int id);

    BrandDto save(BrandDto brandDto);
}
