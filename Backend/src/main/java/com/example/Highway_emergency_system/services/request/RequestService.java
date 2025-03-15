package com.example.Highway_emergency_system.services.request;

import com.example.Highway_emergency_system.helpers.NewRequestHelper;
import com.example.Highway_emergency_system.services.requestimage.RequestImageService;
import lombok.RequiredArgsConstructor;
import com.example.Highway_emergency_system.models.Request;
import org.springframework.stereotype.Service;


import com.example.Highway_emergency_system.repositories.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RequestService implements IRequestService {

    private final RequestRepository requestRepository;
    private final RequestImageService requestImageService;
    @Override
    public Request newRequest(NewRequestHelper request, List<MultipartFile> image) {

        Request newRequest = new Request();

        String UUID = java.util.UUID.randomUUID().toString();
        newRequest.setId(UUID);
        newRequest.setName(request.getName());
        newRequest.setContact(request.getContact());
        Request savedRequest = requestRepository.save(newRequest);
        if(request.getImageList() != null){
            requestImageService.addRequestImage(request.getImageList(), savedRequest);
        }
        return savedRequest;
    }


    @Override
    public Request getRequest(String requestId) {
        return requestRepository.findById(requestId).orElse(null);
    }
}
