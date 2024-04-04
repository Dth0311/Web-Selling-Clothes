package com.example.shopclothes.service.Imp;

import com.example.shopclothes.dto.ProductDTO;
import com.example.shopclothes.entity.Product;
import com.example.shopclothes.exception.DataNotFoundException;
import com.example.shopclothes.response.ProductCategoryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductService {
    List<Product> getList();

    List<Product> getListNewst(int number);

    List<Product> getListByPrice();

    List<Product> findRelatedProduct(int id);

    List<Product> getListProductByCategory(int id);

    List<Product> getListByPriceRange(int id,int min, int max);

    List<Product> searchProduct(String keyword);

    Product getProduct(int id) throws DataNotFoundException;

    Product createProduct(ProductDTO productDTO) throws DataNotFoundException;

    Product updateProduct(int id, ProductDTO productDTO) throws DataNotFoundException;

    void deleteProduct(int id) throws DataNotFoundException;

    Page<Product> getAllProducts(Pageable pageable);

    Page<Product> getProductByCategoryId(int categoryId,PageRequest pageRequest);
}
