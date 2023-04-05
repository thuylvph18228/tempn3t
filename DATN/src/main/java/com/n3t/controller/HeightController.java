package com.n3t.controller;

import com.n3t.entity.Height;
import com.n3t.service.HeightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/n3t/height")
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
