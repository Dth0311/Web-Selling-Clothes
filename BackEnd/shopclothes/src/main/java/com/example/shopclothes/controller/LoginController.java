package com.example.shopclothes.controller;

import com.example.shopclothes.request.UserRequest;
import com.example.shopclothes.service.LoginService;
import com.example.shopclothes.utils.JwtUtilsHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/login")
public class LoginController {

    @Autowired
    LoginService loginService;

    @Autowired
    JwtUtilsHelper jwtUtilsHelper;

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestParam String userName, @RequestParam String password) {
        if(loginService.checkLogin(userName,password)){
            String token = jwtUtilsHelper.generateToken(userName);
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> sigup(@RequestBody UserRequest userRequest){
        return new ResponseEntity<>(loginService.addUser(userRequest), HttpStatus.OK);
    }
}
