package com.example.Highway_emergency_system.services.requestimage;

import com.example.Highway_emergency_system.models.Request;
import com.example.Highway_emergency_system.models.RequestImage;
import com.example.Highway_emergency_system.repositories.RequestImageServiceRepository;
import com.example.Highway_emergency_system.repositories.RequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor

public class RequestImageService implements IRequestImageService {

    private final RequestImageServiceRepository requestImageServiceRepository;

    public String uploadDir;
    @Override
    public List<RequestImage> addRequestImage(List<MultipartFile> requestImage, Request request) {

        List<RequestImage> images = new ArrayList<>();
        if(requestImage != null && !requestImage.isEmpty()) {
            for(MultipartFile file : requestImage) {
                RequestImage image = uploadImage(file, request);
                requestImageServiceRepository.save(image);
                images.add(image);
            }
        }
        return images;
    }

    private RequestImage uploadImage(MultipartFile file, Request request) {
        try{
            if(file != null && !file.isEmpty()) {
                String uploadDir = Paths.get("src", "main", "resources", "static", "uploaded-images").toAbsolutePath().toString();
                String fileName = UUID.randomUUID().toString();
                file.transferTo(new File(uploadDir + "/" + fileName + ".jpg"));
                return new RequestImage(fileName, uploadDir, request);
            }else return null;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public List<RequestImageService> getRequestImages(String requestId) {
        return List.of();
    }
}
