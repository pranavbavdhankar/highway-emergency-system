package com.example.Highway_emergency_system.services.request;

import com.example.Highway_emergency_system.helpers.NewRequestHelper;
import com.example.Highway_emergency_system.models.Request;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IRequestService {

    public Request newRequest(NewRequestHelper request, List<MultipartFile> list);
    public Request getRequest(String requestId);

}
