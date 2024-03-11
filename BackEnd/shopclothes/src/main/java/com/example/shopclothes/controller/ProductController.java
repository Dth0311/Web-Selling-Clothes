package com.example.shopclothes.controller;

import com.example.shopclothes.dto.ProductDTO;
import com.example.shopclothes.entity.Category;
import com.example.shopclothes.entity.Image;
import com.example.shopclothes.entity.Product;
import com.example.shopclothes.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("${api.prefix}/product")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("")
    public ResponseEntity<?> getAllProduct(){
        List<Product> productList = productService.getList();
        List<ProductDTO> productDTOList = new ArrayList<>();
        for (var item:productList) {
            ProductDTO productDTO = ProductDTO.fromProduct(item);
            productDTOList.add(productDTO);
        }
        return ResponseEntity.ok(productDTOList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable int id){
        try{
            Product product = productService.getProduct(id);
            ProductDTO productDTO = ProductDTO.fromProduct(product);
            return ResponseEntity.ok(productDTO);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("")
    public ResponseEntity<?> createProduct(@RequestBody ProductDTO productDTO){
        try{
            Product product = productService.createProduct(productDTO);
            return ResponseEntity.ok(ProductDTO.fromProduct(product));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
