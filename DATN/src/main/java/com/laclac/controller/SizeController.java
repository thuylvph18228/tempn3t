package com.laclac.controller;

import com.laclac.entity.Size;
import com.laclac.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/laclac/size")
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
