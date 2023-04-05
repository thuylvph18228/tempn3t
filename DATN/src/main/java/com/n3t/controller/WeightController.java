package com.n3t.controller;

import com.n3t.entity.Weight;
import com.n3t.service.WeightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/n3t/weight")
@CrossOrigin("*")
public class WeightController {

    @Autowired
    private WeightService weightService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(this.weightService.getAll());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody Weight weight){
        return ResponseEntity.ok(this.weightService.save(weight));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id){
        this.weightService.delete(id);
    }
}
