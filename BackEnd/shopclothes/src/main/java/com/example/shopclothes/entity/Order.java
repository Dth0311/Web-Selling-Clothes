package com.example.shopclothes.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(name="country")
    private String country;

    @Column(name="address")
    private String address;

    @Column(name="town")
    private String town;

    @Column(name="state")
    private String state;

    @Column(name="post_code")
    private long postCode;

    @Column(name="email")
    private String email;

    @Column(name="phone")
    private String phone;

    @Column(name="note")
    private String note;

    @Column(name="total_price")
    private long totalPrice;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @OneToMany(mappedBy="order")
    @JsonBackReference
    private Set<OrderDetail> orderdetails;
}
