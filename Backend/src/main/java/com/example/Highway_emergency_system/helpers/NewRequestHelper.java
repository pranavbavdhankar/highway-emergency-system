package com.example.Highway_emergency_system.helpers;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@AllArgsConstructor
public class NewRequestHelper {

    String name; // Name of the person who reports the incident
    String contact; // Contact of the person reporting incident
    List<MultipartFile> imageList; // To store the images

    public NewRequestHelper(String name, String contact) {
        this.name = name;
        this.contact = contact;
    }
}
