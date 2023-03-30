package com.laclac.controller;

import com.laclac.DTO.ShopDto;
import com.laclac.entity.Shop;
import com.laclac.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/laclac/shop")
@CrossOrigin("*")
public class ShopController {

    @Autowired
    private ShopService shopService;

    @GetMapping
    private ResponseEntity getInfo(){
        return ResponseEntity.ok(this.shopService.get());
    }

    @PostMapping
    private ResponseEntity save(@RequestBody ShopDto shopDto){
        return ResponseEntity.ok(this.shopService.save(shopDto));
    }
}
