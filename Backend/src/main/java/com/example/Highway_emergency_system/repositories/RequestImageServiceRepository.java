package com.example.Highway_emergency_system.repositories;

import com.example.Highway_emergency_system.models.RequestImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestImageServiceRepository extends JpaRepository<RequestImage, String> {
}
