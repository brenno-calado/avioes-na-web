package com.avioesnaweb.server.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:8080")
@RestController
@RequestMapping("/v1")
public class NotFoundController {
    @GetMapping("/*")
    public ResponseEntity<String> notFound() {
        String message = "Unable to locate requested route.";
        System.out.println(String.format(message));
        return new ResponseEntity<>(message, HttpStatus.NOT_FOUND);
    }
}
