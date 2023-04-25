package com.n3t.service;

import com.n3t.DTO.PromotionDto;
import com.n3t.entity.Promotion;

import java.util.List;

public interface PromotionService {
    List<PromotionDto> getAll();
    List<PromotionDto> getAllPromotionByStatusPromotion();
    List<PromotionDto> getAllByStatus(String status);
    //lay ra cac khuyen mai sap toi
    List<Promotion> getAllByDate(String date);
    PromotionDto getById(int PromotionId);
    PromotionDto save(PromotionDto promotionDto);
    Promotion delete(int id);
}
