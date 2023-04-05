package com.n3t.controller;

import com.n3t.service.FeedBackService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/n3t/feedback")
@CrossOrigin("*")
public class FeedbackController {

    private final FeedBackService service;

    public FeedbackController(FeedBackService service) {
        this.service = service;
    }

    @GetMapping("/test")
    public long test() {
       return service.countId();
    }
}
