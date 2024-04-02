package com.example.shopclothes.service;

import com.example.shopclothes.dto.SizeDTO;
import com.example.shopclothes.entity.Size;
import com.example.shopclothes.exception.DataNotFoundException;
import com.example.shopclothes.repository.SizeRepository;
import com.example.shopclothes.service.Imp.ISizeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SizeService implements ISizeService{

    @Autowired
    SizeRepository sizeRepository;

    @Override
    public List<Size> findAll() {
       return sizeRepository.findAll();
    }

    @Override
    public Size createSize(SizeDTO sizeDTO) {
        Size size = new Size();
        size.setName(sizeDTO.getName());
        sizeRepository.save(size);
        return size;
    }

    @Override
    public void deleteSize(int id) throws DataNotFoundException {
        Size size = sizeRepository.findById(id).orElseThrow(()->new DataNotFoundException("Không tìm thấy id size"));
        sizeRepository.delete(size);

    }
}
