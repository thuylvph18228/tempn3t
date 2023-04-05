package com.n3t.controller;

import com.n3t.DTO.ShopDto;
import com.n3t.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/n3t/shop")
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
