package com.example.shopclothes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="user_Name",unique = true)
    private String username;

    @Column(name="email",unique = true)
    private String email;

    @Column(name="first_Name")
    private String firstName;

    @Column(name="last_Name")
    private String lastName;

    @Column(name="password")
    private String password;

    @Column(name="country")
    private String country;

    @Column(name="state")
    private String state;

    @Column(name="address")
    private String address;

    @Column(name="phone")
    private String phone;

    @Column(name = "verification_code", length = 64)
    private String verificationCode;

    @Column(name="enable")
    private boolean enable;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_role",joinColumns = @JoinColumn(name = "user_id"),inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
}
