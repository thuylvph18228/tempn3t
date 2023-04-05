package com.n3t.service;

import com.n3t.entity.BrandCategory;

import java.util.List;

public interface BrandCategoryService {

    BrandCategory getById(int Id);
    List<BrandCategory> getByBrandId(int brandId);
    BrandCategory save(BrandCategory brandCategory);
    void delete(int id);
}
