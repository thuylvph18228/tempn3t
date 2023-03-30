package com.laclac.service;

import com.laclac.DTO.PromotionDto;
import com.laclac.entity.Promotion;

import java.util.List;

public interface PromotionService {
    List<PromotionDto> getAll();
    List<PromotionDto> getAllByStatus(String status);
    //lay ra cac khuyen mai sap toi
    List<Promotion> getAllByDate(String date);
    PromotionDto getById(int PromotionId);
    PromotionDto save(PromotionDto promotionDto);
    Promotion delete(int id);
}
