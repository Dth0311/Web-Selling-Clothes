package com.example.shopclothes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name= "image")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="name")
    private String name;

    @Column(name="type")
    private String type;

    @Column(name="size")
    private long size;

    @Lob
    private byte[] data;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
