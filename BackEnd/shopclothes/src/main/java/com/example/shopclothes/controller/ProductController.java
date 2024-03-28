package com.example.shopclothes.controller;

import com.example.shopclothes.dto.ProductDTO;
import com.example.shopclothes.entity.Category;
import com.example.shopclothes.entity.Image;
import com.example.shopclothes.entity.Product;
import com.example.shopclothes.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*",maxAge = 3600)
@RequestMapping("${api.prefix}/product")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("")
    public ResponseEntity<?> getAllProduct(){
        List<Product> productList = productService.getList();
        return ResponseEntity.ok(productList);
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

    @GetMapping("/listnew/{number}")
    public ResponseEntity<?> getListNewst(@PathVariable int number){
        List<Product> list =productService.getListNewst(number);
        List<ProductDTO> productDTOList = new ArrayList<>();
        for (var item:list) {
            ProductDTO productDTO = ProductDTO.fromProduct(item);
            productDTOList.add(productDTO);
        }
        return ResponseEntity.ok(productDTOList);
    }

    @GetMapping("/price")
    public ResponseEntity<?> getListByPrice(){
        List<Product> list =productService.getListByPrice();
        List<ProductDTO> productDTOList = new ArrayList<>();
        for (var item:list) {
            ProductDTO productDTO = ProductDTO.fromProduct(item);
            productDTOList.add(productDTO);
        }
        return ResponseEntity.ok(productDTOList);
    }

    @GetMapping("/related/{id}")
    public ResponseEntity<?> getListRelatedProduct(@PathVariable int id){
        List<Product> list = productService.findRelatedProduct(id);
        List<ProductDTO> productDTOList = new ArrayList<>();
        for (var item:list) {
            ProductDTO productDTO = ProductDTO.fromProduct(item);
            productDTOList.add(productDTO);
        }
        return ResponseEntity.ok(productDTOList);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<?> getListProductByCategory(@PathVariable int id){
        List<Product> list =  productService.getListProductByCategory(id);
        List<ProductDTO> productDTOList = new ArrayList<>();
        for (var item:list) {
            ProductDTO productDTO = ProductDTO.fromProduct(item);
            productDTOList.add(productDTO);
        }
        return ResponseEntity.ok(productDTOList);
    }

    @GetMapping("/range")
    public ResponseEntity<?> getListProductByPriceRange(@RequestParam("id") int id,@RequestParam("min") int min, @RequestParam("max") int max){
        List<Product> list = productService.getListByPriceRange(id, min, max);
        List<ProductDTO> productDTOList = new ArrayList<>();
        for (var item:list) {
            ProductDTO productDTO = ProductDTO.fromProduct(item);
            productDTOList.add(productDTO);
        }
        return ResponseEntity.ok(productDTOList);
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchProduct(@RequestParam("keyword") String keyword){
        List<Product> list = productService.searchProduct(keyword);
        List<ProductDTO> productDTOList = new ArrayList<>();
        for (var item:list) {
            ProductDTO productDTO = ProductDTO.fromProduct(item);
            productDTOList.add(productDTO);
        }
        return ResponseEntity.ok(productDTOList);
    }

    @PostMapping("")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> createProduct(@RequestBody ProductDTO productDTO){
        try{
            Product product = productService.createProduct(productDTO);
            return ResponseEntity.ok(ProductDTO.fromProduct(product));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateProduct(@PathVariable int id,@RequestBody ProductDTO productDTO){
        try{
            Product product = productService.updateProduct(id,productDTO);
            return ResponseEntity.ok(ProductDTO.fromProduct(product));
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> deleteProduct(@PathVariable int id){
        try{
            productService.deleteProduct(id);
            return ResponseEntity.ok("Xóa sản phẩm thành công");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
