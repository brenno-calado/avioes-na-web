package com.avioesnaweb.server.controller;

import com.avioesnaweb.server.models.Airplanes;
import com.avioesnaweb.server.repositories.AirplanesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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

    @GetMapping("/fastest")
    public ResponseEntity<List<Airplanes>> getFastestAirplanes() {
        try {
        List<Airplanes> listOfAirplanes = new ArrayList<>(10);

        repository.findAll(Sort.by("maximumSpeed").descending()).forEach(listOfAirplanes::add);
        if (listOfAirplanes.isEmpty()) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return new ResponseEntity<>(listOfAirplanes.subList(0, 10), HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(String.format("Exception while fetching getFastestAirplanes method. Error: %s", e.getMessage()));
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/slowest")
    public ResponseEntity<List<Airplanes>> getslowestAirplanes() {
        try {
        List<Airplanes> listOfAirplanes = new ArrayList<>();

        repository.findAll(Sort.by("maximumSpeed").ascending()).forEach(listOfAirplanes::add);
        if (listOfAirplanes.isEmpty()) return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return new ResponseEntity<>(listOfAirplanes, HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(String.format("Exception while fetching getSlowestAirplanes method. Error: %s", e.getMessage()));
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
