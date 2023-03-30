package com.laclac.controller;

import com.laclac.entity.Weight;
import com.laclac.service.WeightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/laclac/weight")
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
