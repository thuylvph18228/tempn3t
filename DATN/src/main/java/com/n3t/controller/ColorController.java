package com.n3t.controller;

import com.n3t.entity.Color;
import com.n3t.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/n3t/color")
@CrossOrigin("*")
public class ColorController {

    @Autowired
    private ColorService colorService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(this.colorService.getAll());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody Color color){
        return ResponseEntity.ok(this.colorService.save(color));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id){
        this.colorService.delete(id);
    }
}
