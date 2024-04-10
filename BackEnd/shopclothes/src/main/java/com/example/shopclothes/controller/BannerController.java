package com.example.shopclothes.controller;

import com.example.shopclothes.entity.Banner;
import com.example.shopclothes.entity.Image;
import com.example.shopclothes.exception.DataNotFoundException;
import com.example.shopclothes.repository.BannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "*",maxAge = 3600)
@RequestMapping("${api.prefix}/banner")
public class BannerController {

    @Autowired
    BannerRepository bannerRepository;

    @GetMapping("")
    public ResponseEntity<?> getList(){
        List<Banner> listImage = bannerRepository.findAll();

        return  ResponseEntity.ok(listImage);
    }

    @GetMapping(value = "/{id}",produces = MediaType.IMAGE_JPEG_VALUE)
    public ResponseEntity<?> getImageByID(@PathVariable int id){
        Banner banner = null;
        try {
            banner = bannerRepository.findById(id).orElseThrow();
            byte[] imageData = banner.getImageData();
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageData);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createBanner(@RequestParam("file") MultipartFile file) {
        try {
            Banner banner = new Banner();
            banner.setImageData(file.getBytes());
            Banner savedBanner = bannerRepository.save(banner);
            return ResponseEntity.ok(banner);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateBanner(@PathVariable int id, @RequestParam("file") MultipartFile file) {
        try {
            Banner banner = bannerRepository.findById(id).orElseThrow();
            banner.setImageData(file.getBytes());
            Banner updatedBanner = bannerRepository.save(banner);
            return ResponseEntity.ok(updatedBanner);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBanner(@PathVariable int id) {
        try {
            bannerRepository.deleteById(id);
            return ResponseEntity.ok("Xóa thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Xóa thất bại");
        }
    }
}
