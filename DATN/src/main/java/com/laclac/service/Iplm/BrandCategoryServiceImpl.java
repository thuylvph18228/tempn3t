package com.laclac.service.Iplm;

import com.laclac.entity.BrandCategory;
import com.laclac.repository.BrandCategoryRepository;
import com.laclac.service.BrandCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BrandCategoryServiceImpl implements BrandCategoryService {

    @Autowired
    private BrandCategoryRepository brandCategoryRepo;

    @Override
    public BrandCategory getById(int id) {
        return this.brandCategoryRepo.findById(id).get();
    }

    @Override
    public List<BrandCategory> getByBrandId(int brandId) {
        return this.brandCategoryRepo.findByBrandId(brandId);
    }

    @Override
    @Transactional
    public BrandCategory save(BrandCategory brandCategory) {
        return this.brandCategoryRepo.save(brandCategory);
    }

    @Override
    @Transactional
    public void delete(int id) {
        this.brandCategoryRepo.deleteById(id);
    }
}
