package com.example.shopclothes.response;

import com.example.shopclothes.entity.Product;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@Builder
@NoArgsConstructor
public class OrderDetailResponse {

    private Product product;

    private int quantity;
}
