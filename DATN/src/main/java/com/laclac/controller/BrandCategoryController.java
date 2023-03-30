package com.laclac.controller;

import com.laclac.DTO.BrandCategoryDto;
import com.laclac.entity.BrandCategory;
import com.laclac.service.BrandCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/laclac/brand-category")
@CrossOrigin("*")
public class BrandCategoryController {

    @Autowired
    private BrandCategoryService brandCategoryService;

    @GetMapping("/{brandId}")
    public ResponseEntity getAllByBrandId(@PathVariable("brandId") int brandId){
        return ResponseEntity.ok(this.brandCategoryService.getByBrandId(brandId));
    }

    @PostMapping
    public ResponseEntity save(@RequestBody BrandCategoryDto brandCategoryDto) {
        return ResponseEntity.ok(this.brandCategoryService.save(BrandCategory.toEndtity(brandCategoryDto)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") Integer id) {
        this.brandCategoryService.delete(id);
        return ResponseEntity.ok(null);
    }

}
