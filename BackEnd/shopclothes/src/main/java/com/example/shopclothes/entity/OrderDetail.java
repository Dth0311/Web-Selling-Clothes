package com.example.shopclothes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "order_detail")
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="sub_total")
    private String name;

    @Column(name="price")
    private long price;

    @Column(name="quantity")
    private int quantity;

    @Column(name="sub_total",insertable=false, updatable=false)
    private long subTotal;

    @ManyToOne
    @JoinColumn(name ="order_id")
    private Order order;
}
