package com.example.shopclothes.controller;

import com.example.shopclothes.dto.SizeDTO;
import com.example.shopclothes.entity.Size;
import com.example.shopclothes.exception.DataNotFoundException;
import com.example.shopclothes.service.SizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*",maxAge = 3600)
@RequestMapping("${api.prefix}/size")
public class SizeController {

    @Autowired
    SizeService sizeService;

    @GetMapping("")
    public ResponseEntity<?> getListSize(){
        return ResponseEntity.ok(sizeService.findAll());
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createSize(@RequestBody SizeDTO sizeDTO){
        Size size = sizeService.createSize(sizeDTO);
        return ResponseEntity.ok(size);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteSize(@PathVariable int id){
        try {
            sizeService.deleteSize(id);
            return ResponseEntity.ok("Xóa thành công");
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
