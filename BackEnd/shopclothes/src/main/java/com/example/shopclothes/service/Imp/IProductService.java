package com.example.shopclothes.service.Imp;

import com.example.shopclothes.dto.ProductDTO;
import com.example.shopclothes.entity.Product;
import com.example.shopclothes.exception.DataNotFoundException;

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

    Product updateProduct(int id, ProductDTO productDTO);

    void deleteProduct(int id);
}
