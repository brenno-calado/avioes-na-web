package com.avioesnaweb.server.controller;

import com.avioesnaweb.server.models.Airplanes;
import com.avioesnaweb.server.repositories.AirplanesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("http://localhost:8080")
@RestController
@RequestMapping("/v1/airplanes")
public class AirplanesController {
    @Autowired
    AirplanesRepository repository;

    @GetMapping("/")
    public ResponseEntity<List<Airplanes>> getAllAirplanes() {
        try {
            List<Airplanes> listOfAirplanes = new ArrayList<>();

            repository.findAll().forEach(listOfAirplanes::add);

            if (listOfAirplanes.isEmpty()) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            return new ResponseEntity<>(listOfAirplanes, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(String.format("Exception while fetching getAllAirplanes method. Error: %s", e.getMessage()));
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
