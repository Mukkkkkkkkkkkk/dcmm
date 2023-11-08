package com.example.datn404shoes.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductCartNotFound extends RuntimeException{

    private String message;

    public ProductCartNotFound(String message){
        super(message);
    }

    public ProductCartNotFound(String message, Throwable cause){
        super(message, cause);
    }
}
