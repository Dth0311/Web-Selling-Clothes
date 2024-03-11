package com.example.shopclothes.controller;

import com.example.shopclothes.dto.CategoryDTO;
import com.example.shopclothes.entity.Category;
import com.example.shopclothes.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/category")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<?> getCategories(){
        return ResponseEntity.ok(categoryService.findAll());
    }

    @GetMapping("/enable")
    public ResponseEntity<?> getCategoriesEnable(){
        return ResponseEntity.ok(categoryService.getListEnabled());
    }

    @PostMapping("")
    public ResponseEntity<?> createCategory(@RequestBody CategoryDTO categoryDTO){
        Category category = categoryService.createCategory(categoryDTO);
        return ResponseEntity.ok(category);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategoryById(@PathVariable int id, @RequestBody CategoryDTO categoryDTO){
            boolean isSuccess = categoryService.updateCategory(id,categoryDTO);
        return ResponseEntity.ok(isSuccess);
    }

    @PutMapping("/enable/{id}")
    public ResponseEntity<?> enableById(@PathVariable int id){
        categoryService.enableCategory(id);
        return ResponseEntity.ok("Cập nhật thành công");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategoryById(@PathVariable int id){
        categoryService.deleteCategory(id);
        return ResponseEntity.ok("Xóa thành công category id: " + id);
    }


}
