package com.example.shopclothes.service;

import com.example.shopclothes.dto.CategoryDTO;
import com.example.shopclothes.entity.Category;
import com.example.shopclothes.repository.CategoryRepository;
import com.example.shopclothes.service.Imp.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {

    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Override
    public List<Category> getListEnabled() {
        return categoryRepository.findAllByEnable(true);
    }

    @Override
    public Category createCategory(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setEnable(true);
        categoryRepository.save(category);
        return category;
    }

    @Override
    public boolean updateCategory(int id, CategoryDTO categoryDTO){
        boolean isUpdate = false;
        Category category = null;
        try {
            category = categoryRepository.findById(id).orElseThrow();
            category.setName(categoryDTO.getName());
            categoryRepository.save(category);
            isUpdate = true;
        } catch (Exception e) {
            System.out.println("Error update category: " + e.getMessage());
        }
        return isUpdate;
    }

    @Override
    public void enableCategory(long id) {

    }

    @Override
    public void deleteCategory(long id) {

    }
}
