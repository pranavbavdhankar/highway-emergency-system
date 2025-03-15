package com.example.Highway_emergency_system.helpers;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Response<T> {
    int statusCode;
    String message;
    T data;
}
