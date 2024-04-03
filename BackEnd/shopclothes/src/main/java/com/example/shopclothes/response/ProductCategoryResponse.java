package com.example.shopclothes.response;

import com.example.shopclothes.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@Data
@Builder
@NoArgsConstructor
public class ProductCategoryResponse {
    private int categoryId;
    private List<Product> products;
    private int totalPages;

    public static ProductCategoryResponse fromProduct(List<Product> product) {
        ProductCategoryResponse productResponse = ProductCategoryResponse.builder()
                .products(product)
                .build();
        return productResponse;
    }
}
