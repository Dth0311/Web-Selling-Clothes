package com.example.shopclothes.dto;

import com.example.shopclothes.entity.Category;
import com.example.shopclothes.entity.Image;
import com.example.shopclothes.entity.Product;
import com.example.shopclothes.entity.Size;
import com.example.shopclothes.exception.DataNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private int id;
    private String name;
    private String description;
    private long price;
    private int categoryId;
    private Set<Integer> imageIds;
    private Set<Integer> sizeIds;

    public static ProductDTO fromProduct(Product product){
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setName(product.getName());
        productDTO.setPrice(product.getPrice());
        productDTO.setCategoryId(product.getCategory().getId());
        productDTO.setDescription(product.getDescription());
        if(!product.getImages().isEmpty()){
            productDTO.setImageIds(product.getImages().stream()
                    .map(Image::getId)
                    .collect(Collectors.toSet()));
        }
        return productDTO;
    }
}
