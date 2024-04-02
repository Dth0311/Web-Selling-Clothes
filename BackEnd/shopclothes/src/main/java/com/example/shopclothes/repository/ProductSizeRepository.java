package com.example.shopclothes.repository;

import com.example.shopclothes.entity.Category;
import com.example.shopclothes.entity.ProductSize;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductSizeRepository extends JpaRepository<ProductSize,Integer> {
    @Query(value ="Select * from product_size where id = :id",nativeQuery = true)
    ProductSize findById(int id);

    @Query(value ="Select * from product_size where product_id = :productId and size_id = :sizeId",nativeQuery = true)
    ProductSize getQuantity(int productId,int sizeId);
}
