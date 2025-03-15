package com.example.Highway_emergency_system.helpers;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@AllArgsConstructor
public class NewRequestHelper {

    String name; // Name of the person who reports the incident
    String contact; // Contact of the person reporting incident
    String message;
    double latitude;
    double longitude;
    String address;
    String type;
    List<MultipartFile> imageList;
}
