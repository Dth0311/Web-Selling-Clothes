package com.example.shopclothes.service.Imp;

import com.example.shopclothes.dto.CategoryDTO;
import com.example.shopclothes.dto.SizeDTO;
import com.example.shopclothes.entity.Category;
import com.example.shopclothes.entity.Size;
import com.example.shopclothes.exception.DataNotFoundException;

import java.util.List;

public interface ISizeService {

    List<Size> findAll();
    Size createSize(SizeDTO sizeDTO);
    void deleteSize(int id) throws DataNotFoundException;
}
