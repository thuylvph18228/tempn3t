package com.laclac.controller;

import com.laclac.service.OrderHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/laclac/orderReturn")
@CrossOrigin("*")
public class OrderHistoryController {

    @Autowired
    private OrderHistoryService orderHistoryService;

    @GetMapping
    public ResponseEntity getAllByUsername(@RequestParam("username") String username){
        return ResponseEntity.ok(this.orderHistoryService.getAllByUsername(username));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable("id") Integer id) {
        this.orderHistoryService.delete(id);
        return ResponseEntity.ok(null);
    }
}
