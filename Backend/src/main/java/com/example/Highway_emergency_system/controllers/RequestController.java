package com.example.Highway_emergency_system.controllers;


import com.example.Highway_emergency_system.helpers.NewRequestHelper;
import com.example.Highway_emergency_system.helpers.Response;
import lombok.RequiredArgsConstructor;
import com.example.Highway_emergency_system.models.Request;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.Highway_emergency_system.services.request.RequestService;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/request")
@RequiredArgsConstructor
public class RequestController {

    private final RequestService requestService;

    @PostMapping("/new")
    public ResponseEntity<Response<Request>> newRequest(@RequestParam("imageList") List<MultipartFile> imageList,
                                                        @RequestParam("name") String name,
                                                        @RequestParam("contact") String  contact,
                                                        @RequestParam("latitude") double latitude,
                                                        @RequestParam("longitude") double longitude,
                                                        @RequestParam("message") String message,
                                                        @RequestParam("address") String address,
                                                        @RequestParam("type") String type) {
        NewRequestHelper request = new NewRequestHelper(name, contact, message, latitude, longitude, address,type, imageList);
        Request data = requestService.newRequest(request, imageList);
        Response<Request> response = new Response<>();
        response.setData(data);
        response.setMessage("New Request Add Successfully");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
