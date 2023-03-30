package com.laclac.controller;

import com.laclac.entity.Color;
import com.laclac.entity.Material;
import com.laclac.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/laclac/material")
@CrossOrigin("*")
public class MaterialController {

    @Autowired
    private MaterialService materialService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(this.materialService.getAll());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody Material material){
        return ResponseEntity.ok(this.materialService.save(material));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id){
        this.materialService.delete(id);
    }

}
