package com.laclac.service.Iplm;

import com.laclac.entity.PromotionCategory;
import com.laclac.service.PromotionCategoryService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PromotionCategoryServiceImpl implements PromotionCategoryService {
    @Override
    @Transactional
    public List<PromotionCategory> getAll() {
        return null;
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
        return null;
    }

    @Override
    @Transactional
    public PromotionCategory update(PromotionCategory promotionCategory) {
        return null;
    }

    @Override
    @Transactional
    public PromotionCategory delete(int id) {
        return null;
    }
}
