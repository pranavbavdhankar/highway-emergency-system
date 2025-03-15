package com.example.Highway_emergency_system.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Request {

    @Id
    String id; // Unique Id for
    String name; // Name of the person who reports the incident
    String type;
    @Column(unique = false)
    String contact; // Contact of the person reporting incident
    String message;
    double latitude;
    double longitude;
    String address;
    @OneToMany(mappedBy = "request", cascade = CascadeType.ALL, orphanRemoval = true)
    List<RequestImage> imageList; // To store the images

}
