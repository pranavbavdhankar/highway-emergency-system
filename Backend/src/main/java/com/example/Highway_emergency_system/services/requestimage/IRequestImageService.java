package com.example.Highway_emergency_system.services.requestimage;

import com.example.Highway_emergency_system.models.Request;
import com.example.Highway_emergency_system.models.RequestImage;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IRequestImageService {

    public List<RequestImage> addRequestImage(List<MultipartFile> requestImage, Request request);

    public List<RequestImageService> getRequestImages(String requestId);

}
