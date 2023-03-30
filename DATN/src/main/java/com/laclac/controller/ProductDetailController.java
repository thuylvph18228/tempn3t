package com.laclac.controller;

import com.laclac.DTO.ProductDetailDto;
import com.laclac.entity.ProductDetail;
import com.laclac.service.ProductDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/laclac/product/detail")
@CrossOrigin("*")
public class ProductDetailController {

    @Autowired
    private ProductDetailService productDetailService;

    @GetMapping("/{productId}")
    public ResponseEntity getAllByProductId(@PathVariable("productId") int productId){
        return ResponseEntity.ok(this.productDetailService.getAllByProductId(productId));
    }

    @PostMapping("/{productId}")
    public ResponseEntity save(@RequestBody ProductDetailDto productDetailDto, @PathVariable("productId") Integer productId){
        productDetailDto.setProductId(productId);
        return ResponseEntity.ok(this.productDetailService.save(productDetailDto));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id){
        this.productDetailService.delete(id);
    }

    @GetMapping("/check-quantity/{id}")
    public ResponseEntity checkQuantity(@PathVariable("id") Integer id, @RequestParam("quantity") Integer quantity){
        return ResponseEntity.ok(this.productDetailService.checkQuantity(id, quantity));
    }

}
