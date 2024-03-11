package com.example.shopclothes.service.Imp;

import com.example.shopclothes.dto.CategoryDTO;
import com.example.shopclothes.entity.Category;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.List;

public interface ICategoryService {
    List<Category> findAll();

    List<Category> getListEnabled();

    Category createCategory(CategoryDTO categoryDTO);

    boolean updateCategory(int id,CategoryDTO categoryDTO) throws Exception;

    void enableCategory(long id);

    void deleteCategory(long id);
}
