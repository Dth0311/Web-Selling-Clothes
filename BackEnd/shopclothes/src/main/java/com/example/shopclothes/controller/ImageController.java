package com.example.shopclothes.controller;


import com.example.shopclothes.entity.Image;
import com.example.shopclothes.exception.BadRequestException;
import com.example.shopclothes.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("${api.prefix}/image")
public class ImageController {

    private static String UPLOAD_DIR  = System.getProperty("user.dir") + "/src/main/resources/static/Uploads/";

    @Autowired
    ImageService imageService;

    @GetMapping("")
    public ResponseEntity<?> getList(){
        List<Image> listImage = imageService.getListImage();

        return  ResponseEntity.ok(listImage);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getListByUser(@PathVariable int userId){
        List<Image> listImage = imageService.getListByUser(userId);

        return ResponseEntity.ok(listImage);
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) throws BadRequestException {
        File uploadDir = new File(UPLOAD_DIR);
        if (!uploadDir.exists()) {
            uploadDir.mkdirs();
        }
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);;
        if (originalFilename != null && originalFilename.length() > 0) {

            if (!extension.equals("png") && !extension.equals("jpg") && !extension.equals("gif") && !extension.equals("svg") && !extension.equals("jpeg")) {
                throw new BadRequestException("Không hỗ trợ định dạng file này");
            }
            try {
                Image img = new Image();
                img.setName(file.getName());
                img.setSize(file.getSize());
                img.setType(extension);
                img.setData(file.getBytes());
                String uid = UUID.randomUUID().toString();
                String link = UPLOAD_DIR + uid + "." + extension;
                File serverFile = new File(link);
                BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
                stream.write(file.getBytes());
                stream.close();

                imageService.insertImage(img);
                return ResponseEntity.ok(img);
            } catch (Exception e) {
                throw new BadRequestException("Lỗi khi upload file");
            }
        }
        throw new BadRequestException("File không hợp lệ");

    }
}
