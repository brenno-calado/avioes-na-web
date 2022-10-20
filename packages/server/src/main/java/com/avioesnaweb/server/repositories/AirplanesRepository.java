package com.avioesnaweb.server.repositories;

import com.avioesnaweb.server.models.Airplanes;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AirplanesRepository extends MongoRepository<Airplanes, String> {
    List<Airplanes> findAll();
    List<Airplanes> findByTitle(String title);
    List<Airplanes> findByRole(String role);
}
