package com.n3t.controller;

import com.n3t.entity.Size;
import com.n3t.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/n3t/size")
@CrossOrigin("*")
public class SizeController {

    @Autowired
    private SizeService sizeService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(this.sizeService.getAll());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody Size size){
        return ResponseEntity.ok(this.sizeService.save(size));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id){
        this.sizeService.delete(id);
    }
}
