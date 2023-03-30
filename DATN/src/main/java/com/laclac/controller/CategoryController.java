package com.laclac.controller;

import com.laclac.DTO.CategoryDto;
import com.laclac.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/laclac/category")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(this.categoryService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity getById(@PathVariable("id") Integer id){
        return ResponseEntity.ok(this.categoryService.getById(id));
    }
    @GetMapping("/get-by-name")
    public ResponseEntity<?> getAllByName(@RequestParam(value = "name") String name){
        return ResponseEntity.ok( this.categoryService.getByName(name));
    }

    @PostMapping()
    public ResponseEntity<?> save(@RequestBody CategoryDto categoryDto){
        return ResponseEntity.ok(this.categoryService.save(categoryDto));
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Integer id){
        this.categoryService.delete(id);
    }

}
