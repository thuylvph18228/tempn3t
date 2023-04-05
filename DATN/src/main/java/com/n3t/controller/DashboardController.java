package com.n3t.controller;

import com.n3t.service.DashboardAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/n3t/thong-ke")
@CrossOrigin("*")
public class DashboardController {

    @Autowired
    private DashboardAnalysisService service;

    @GetMapping
    public ResponseEntity<?> dashboardAnalysis() {
        return ResponseEntity.ok(service.dashboardAnalysis());
    }


}
