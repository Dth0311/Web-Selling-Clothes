package com.example.shopclothes.service;

import com.example.shopclothes.entity.Image;
import com.example.shopclothes.exception.DataNotFoundException;
import com.example.shopclothes.repository.ImageRepository;
import com.example.shopclothes.service.Imp.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService implements IImageService {

    @Autowired
    ImageRepository imageRepository;

    @Override
    public List<Image> getListImage() {
        return imageRepository.findAll();
    }

    @Override
    public Image getImageById(int id) throws DataNotFoundException {
        Image image = imageRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Image không tồn tại id :" + id));
        return image;
    }

    @Override
    public Image insertImage(Image image) {
        return imageRepository.save(image);
    }

    @Override
    public List<Image> getListByUser(int userId) {
        List<Image> images = imageRepository.getListImage(userId);
        return images;
    }
}
