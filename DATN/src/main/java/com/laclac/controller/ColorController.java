package com.laclac.controller;

import com.laclac.entity.Color;
import com.laclac.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/laclac/color")
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
