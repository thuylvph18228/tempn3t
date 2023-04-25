package com.n3t.controller;

import com.n3t.DTO.PromotionDto;
import com.n3t.DTO.VoucherDto;
import com.n3t.service.PromotionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/n3t/promotion")
public class PromotionController {

    @Autowired
    private PromotionService promotionService;

    @GetMapping
    private ResponseEntity getAllPromotion() {
        return ResponseEntity.ok(this.promotionService.getAll());
    }

    @GetMapping("/getAllPromotionByStatusPromotion")
    private ResponseEntity getAllPromotionByStatusPromotion() {
        return ResponseEntity.ok(this.promotionService.getAllPromotionByStatusPromotion());
    }

    @PostMapping
    private ResponseEntity save(@RequestBody PromotionDto promotionDto){
        return ResponseEntity.ok(this.promotionService.save(promotionDto));
    }

    @PutMapping()
    private void delete (@RequestBody PromotionDto promotionDto) {
        promotionDto.setIsDelete(1);
        promotionDto.setStatus("UNAVAILABLE");
        this.save(promotionDto);
    }

}
