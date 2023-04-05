package com.n3t.service;

import com.n3t.DTO.CategoryDto;
import com.n3t.entity.Category;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CategoryService {
    List<CategoryDto> getAll();
    Category getById(int categoryId);
    Category getByBrandId(int brandId);
    CategoryDto save(CategoryDto categoryDto);

    @Transactional
    Category save(Category category);

    Category update(Category category);
    Category delete(int id);

    List<Category> getByName(String name);
    List<CategoryDto> getAllBy(List<Integer> all);

}
