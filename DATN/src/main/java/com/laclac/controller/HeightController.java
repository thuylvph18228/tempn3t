package com.laclac.controller;

import com.laclac.entity.Color;
import com.laclac.entity.Height;
import com.laclac.service.HeightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/laclac/height")
@CrossOrigin("*")
public class HeightController {

    @Autowired
    private HeightService heightService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(this.heightService.getAll());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody Height height){
        return ResponseEntity.ok(this.heightService.save(height));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id){
        this.heightService.delete(id);
    }
}
