package com.laclac.service;

import com.laclac.entity.PromotionBlacklist;

import java.util.List;

public interface PromotionBlackListService {
    List<PromotionBlacklist> getAll();
    List<PromotionBlacklist> getAllByPromotionId( int PromotionId);
    PromotionBlacklist getById(int PromotionBlacklistId);
    PromotionBlacklist save(PromotionBlacklist promotionBlacklist);
    PromotionBlacklist update(PromotionBlacklist promotionBlacklist);
    PromotionBlacklist delete(int id);
}
