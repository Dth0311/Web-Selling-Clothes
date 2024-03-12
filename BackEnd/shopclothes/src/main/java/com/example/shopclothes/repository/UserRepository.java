package com.example.shopclothes.repository;

import com.example.shopclothes.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    @Query(value = "Select * from user where user_name = :userName",nativeQuery = true)
    User findByUserName(String userName);
}
