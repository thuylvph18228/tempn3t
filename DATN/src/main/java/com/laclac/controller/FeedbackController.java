package com.laclac.controller;

import com.laclac.service.FeedBackService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/laclac/feedback")
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
