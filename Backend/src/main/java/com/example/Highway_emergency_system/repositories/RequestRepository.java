package com.example.Highway_emergency_system.repositories;

import com.example.Highway_emergency_system.models.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestRepository extends JpaRepository<Request, String> {
}
