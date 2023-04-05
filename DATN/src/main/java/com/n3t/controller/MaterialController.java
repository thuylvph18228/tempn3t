package com.n3t.controller;

import com.n3t.entity.Material;
import com.n3t.service.MaterialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/n3t/material")
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
