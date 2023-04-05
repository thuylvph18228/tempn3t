package com.n3t.controller;

import com.n3t.DTO.BrandDto;
import com.n3t.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/n3t/brand")
@CrossOrigin("*")
public class BrandController {

    @Autowired
    private BrandService brandService;

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(this.brandService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(this.brandService.getById(id));
    }

    @PostMapping()
    public ResponseEntity<?> save(@RequestBody BrandDto brandDto){
        return ResponseEntity.ok(this.brandService.save(brandDto));
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id){
        this.brandService.delete(id);
    }

}
