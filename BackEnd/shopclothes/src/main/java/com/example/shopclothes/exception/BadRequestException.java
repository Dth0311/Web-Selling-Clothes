package com.example.shopclothes.exception;

public class BadRequestException extends Exception{
    public BadRequestException(String message){
        super(message);
    }
}
