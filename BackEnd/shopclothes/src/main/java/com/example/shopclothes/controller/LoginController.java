package com.example.shopclothes.controller;

import com.example.shopclothes.exception.DataNotFoundException;
import com.example.shopclothes.request.LoginRequest;
import com.example.shopclothes.request.UserRequest;
import com.example.shopclothes.service.LoginService;
import com.example.shopclothes.utils.JwtUtilsHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*",maxAge = 3600)
@RequestMapping("${api.prefix}/login")
public class LoginController {

    @Autowired
    LoginService loginService;

    @Autowired
    JwtUtilsHelper jwtUtilsHelper;

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody LoginRequest loginRequest) {
        try {
            return new ResponseEntity<>(loginService.checkLogin(loginRequest), HttpStatus.OK);
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> sigup(@RequestBody UserRequest userRequest){
        return new ResponseEntity<>(loginService.addUser(userRequest), HttpStatus.OK);
    }
}
