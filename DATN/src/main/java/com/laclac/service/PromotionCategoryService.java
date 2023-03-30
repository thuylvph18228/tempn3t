package com.laclac.service;

import com.laclac.entity.PromotionCategory;

import java.util.List;

public interface PromotionCategoryService {
    List<PromotionCategory> getAll();
    List<PromotionCategory> getAllByPromotionId(int promotionId);
    List<PromotionCategory> getAllCategoryId(int categoryId);
    PromotionCategory getById(int PromotionCategoryId);
    PromotionCategory save(PromotionCategory promotionCategory);
    PromotionCategory update(PromotionCategory promotionCategory);
    PromotionCategory delete(int id);
}
