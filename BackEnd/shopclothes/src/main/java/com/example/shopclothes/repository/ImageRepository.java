package com.example.shopclothes.repository;

import com.example.shopclothes.entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image,Integer> {

    @Query(nativeQuery = true, value = "SELECT * FROM image WHERE user_id = ?1")
    List<Image> getListImage(int userId);
}
