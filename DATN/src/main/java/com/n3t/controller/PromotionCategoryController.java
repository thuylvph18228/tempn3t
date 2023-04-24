package com.n3t.controller;

import com.n3t.entity.PromotionCategory;
import com.n3t.service.PromotionCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/n3t/promotion-category")
public class PromotionCategoryController {

    @Autowired
    private PromotionCategoryService promotionCategoryService;

    @GetMapping
    private ResponseEntity getAllPromotion() {
        return ResponseEntity.ok(this.promotionCategoryService.getAll());
    }

    @PostMapping
    private ResponseEntity save(@RequestBody PromotionCategory promotionCategory){
        return ResponseEntity.ok(this.promotionCategoryService.save(promotionCategory));
    }

    @PutMapping()
    private void delete (@RequestBody PromotionCategory promotionCategory) {
        this.delete(promotionCategory);
    }
}
