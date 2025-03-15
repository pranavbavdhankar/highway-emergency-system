package com.example.Highway_emergency_system.controllers;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @PostMapping("/")
    public String index(){
        return "Route Loaded";
    }

}
