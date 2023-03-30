package com.laclac.controller;

import com.laclac.DTO.PromotionDto;
import com.laclac.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/laclac/promotion")
public class PromotionController {

    @Autowired
    private PromotionService promotionService;

    @GetMapping
    private ResponseEntity getAllPromotion() {
        return ResponseEntity.ok(this.promotionService.getAll());
    }

    @PostMapping
    private ResponseEntity save(@RequestBody PromotionDto promotionDto){
        return ResponseEntity.ok(this.promotionService.save(promotionDto));
    }

}
