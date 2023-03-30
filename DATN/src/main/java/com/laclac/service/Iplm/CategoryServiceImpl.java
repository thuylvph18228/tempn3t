package com.laclac.service.Iplm;

import com.laclac.DTO.CategoryDto;
import com.laclac.entity.Category;
import com.laclac.repository.CategoryRepository;
import com.laclac.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepo;


    @Override
    @Transactional
//    public List<Category> getAll() {
//        return this.categoryRepo.findAll();
//    }
    public List<CategoryDto> getAll() {
        return this.categoryRepo.findAll().stream().map(Category :: toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Category getById(int categoryId) {
        return null;
    }

    @Override
    @Transactional
    public Category getByBrandId(int brandId) {
        return null;
    }

    @Override
       public CategoryDto save(CategoryDto categoryDto) {
            CategoryDto c = this.categoryRepo.saveAndFlush(Category.toEntity(categoryDto)).toDto();
            return c;

    }

    @Override
    public Category save(Category category) {
        return null;
    }

    @Override
    @Transactional
    public Category update(Category category) {
        return null;
    }

    @Override
    @Transactional
    public Category delete(int id) {
        this.categoryRepo.deleteById(id);
        return null;
    }


    @Override
    public List<Category> getByName(String name) {
        return null;
    }

    @Override
    public List<CategoryDto> getAllBy(List<Integer> all) {
        return null;
    }
}
