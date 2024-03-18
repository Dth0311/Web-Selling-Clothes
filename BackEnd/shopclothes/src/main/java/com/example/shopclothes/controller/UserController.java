package com.example.shopclothes.controller;

import com.example.shopclothes.dto.UserDTO;
import com.example.shopclothes.entity.User;
import com.example.shopclothes.exception.DataNotFoundException;
import com.example.shopclothes.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Encoders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;

@RestController
@RequestMapping("${api.prefix}/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getuser(@RequestParam("username") String username){
        User user = null;
        try {
            user = userService.getUserByUsername(username);
            return ResponseEntity.ok(user);
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateProfile(@RequestBody UserDTO userDTO){
        User user = null;
        try {
            user = userService.updateUser(userDTO);
            return ResponseEntity.ok(UserDTO.fromUser(user));
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
