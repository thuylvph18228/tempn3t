package com.n3t.service.Iplm;

import com.n3t.entity.PromotionCategory;
import com.n3t.repository.PromotionCategoryRepository;
import com.n3t.service.PromotionCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PromotionCategoryServiceImpl implements PromotionCategoryService {

    @Autowired
    PromotionCategoryRepository promotionCategoryRepository;

    @Override
    @Transactional
    public List<PromotionCategory> getAll() {
        return this.promotionCategoryRepository.findAll();
    }

    @Override
    @Transactional
    public List<PromotionCategory> getAllByPromotionId(int promotionId) {
        return null;
    }

    @Override
    @Transactional
    public List<PromotionCategory> getAllCategoryId(int categoryId) {
        return null;
    }

    @Override
    @Transactional
    public PromotionCategory getById(int PromotionCategoryId) {
        return null;
    }

    @Override
    @Transactional
    public PromotionCategory save(PromotionCategory promotionCategory) {
        return this.promotionCategoryRepository.save(promotionCategory);
    }

    @Override
    @Transactional
    public PromotionCategory update(PromotionCategory promotionCategory) {
        return this.promotionCategoryRepository.save(promotionCategory);
    }

    @Override
    @Transactional
    public PromotionCategory delete(int id) {
        return null;
    }
}
