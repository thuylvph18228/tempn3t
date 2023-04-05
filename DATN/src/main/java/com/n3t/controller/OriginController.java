package com.n3t.controller;

import com.n3t.entity.Origin;
import com.n3t.service.OriginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/n3t/origin")
@CrossOrigin("*")
public class OriginController {

    @Autowired
    private OriginService originService;

    @GetMapping
    public ResponseEntity getAll(){
        return ResponseEntity.ok(this.originService.getAll());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody Origin origin){
        return ResponseEntity.ok(this.originService.save(origin));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id){
        this.originService.delete(id);
    }

}
