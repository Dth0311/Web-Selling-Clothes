package com.example.shopclothes.service.Imp;

import com.example.shopclothes.entity.Image;
import com.example.shopclothes.exception.DataNotFoundException;

import java.util.List;

public interface IImageService {

    List<Image> getListImage();

    Image getImageById(int id) throws DataNotFoundException;

    Image insertImage(Image image);

    List<Image> getListByUser(int userId);
}
