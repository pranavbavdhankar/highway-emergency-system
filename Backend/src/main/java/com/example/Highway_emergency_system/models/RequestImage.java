package com.example.Highway_emergency_system.models;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestImage {

    @Id
    String id;
    String filePath;

    @ManyToOne
    @JoinColumn(name="request_id", nullable = false)
    Request request;

    public RequestImage(String id, String filePath){
        this.id= id;
        this.filePath = filePath;
    }
}
