package com.example.shopclothes.controller;

import com.example.shopclothes.dto.ProductDTO;
import com.example.shopclothes.entity.Product;
import com.example.shopclothes.entity.ProductSize;
import com.example.shopclothes.repository.ProductSizeRepository;
import com.example.shopclothes.response.ProductCategoryResponse;
import com.example.shopclothes.response.ProductListResponse;
import com.example.shopclothes.request.ProductSizeRequest;
import com.example.shopclothes.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*",maxAge = 3600)
@RequestMapping("${api.prefix}/product")
public class ProductController {

    @Autowired
    ProductService productService;

    @Autowired
    ProductSizeRepository productSizeRepository;

    @GetMapping("")
    public ResponseEntity<?> getAllProduct(){
        List<Product> productList = productService.getList();
        return ResponseEntity.ok(productList);
    }

    @GetMapping("/limit")
    public ResponseEntity<?> getProducts(
            @RequestParam("page")     int page,
            @RequestParam("limit")    int limit
    ) {
        PageRequest pageRequest = PageRequest.of(
                page, limit,
                Sort.by("id").descending());
        Page<Product> productPage = productService.getAllProducts(pageRequest);
        // Lấy tổng số trang
        int totalPages = productPage.getTotalPages();
        List<Product> products = productPage.getContent();
        return ResponseEntity.ok(ProductListResponse
                .builder()
                .products(products)
                .totalPages(totalPages)
                .build());
    }

    @GetMapping("/category")
    public ResponseEntity<?> getProductByCategoryId(
            @RequestParam("categoryId") int categoryId,
            @RequestParam("page")     int page,
            @RequestParam("limit")    int limit
    ) {
        PageRequest pageRequest = PageRequest.of(
                page, limit,
                Sort.by("id").descending());
        Page<Product> productPage = productService.getProductByCategoryId(categoryId,pageRequest);
        // Lấy tổng số trang
        int totalPages = productPage.getTotalPages();
        List<Product> products = productPage.getContent();
        return ResponseEntity.ok(ProductCategoryResponse
                .builder()
                .categoryId(categoryId)
                .products(products)
                .totalPages(totalPages)
                .build());
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

    @PutMapping("/quantity")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateProductSizeQuantity(@RequestBody ProductSizeRequest productSizeRequest) {
        try{
            ProductSize productSize = productSizeRepository.getQuantity(productSizeRequest.getProductId(),productSizeRequest.getSizeId());
            productSize.setQuantity(productSizeRequest.getQuantity());
            productSizeRepository.save(productSize);
            return ResponseEntity.ok(productSize);
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/quantity")
    public ResponseEntity<?> getQuantity(){
        try{
            List<ProductSize> productSize = productSizeRepository.findAll();
            return ResponseEntity.ok(productSize);
        }catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
