package com.example.shopclothes.controller;

import com.example.shopclothes.dto.BlogDTO;
import com.example.shopclothes.entity.Blog;
import com.example.shopclothes.exception.DataNotFoundException;
import com.example.shopclothes.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("${api.prefix}/blog")
public class BlogController {

    @Autowired
    BlogService blogService;

    @GetMapping("")
    public ResponseEntity<?> getListBlog(){
        List<Blog> list = blogService.getList();
        List<BlogDTO> blogDTOList = new ArrayList<>();
        for (var item:list) {
            BlogDTO blogDTO = BlogDTO.fromBlog(item);
            blogDTOList.add(blogDTO);
        }
        return ResponseEntity.ok(blogDTOList);

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBlog(@PathVariable int id){

        Blog blog = null;
        try {
            blog = blogService.getBlogById(id);
            return ResponseEntity.ok(BlogDTO.fromBlog(blog));
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/newest")
    public ResponseEntity<?> getListNewest(@RequestParam int limit){
        List<Blog> list = blogService.getListBlogNew(limit);
        List<BlogDTO> blogDTOList = new ArrayList<>();
        for (var item:list) {
            BlogDTO blogDTO = BlogDTO.fromBlog(item);
            blogDTOList.add(blogDTO);
        }
        return ResponseEntity.ok(blogDTOList);
    }

    @PostMapping("/create")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> create(@RequestBody BlogDTO blogDTO){
        Blog blog = null;
        try {
            blog = blogService.createBlog(blogDTO);
            return ResponseEntity.ok("Tạo blog thành công");
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody BlogDTO blogDTO){
        Blog blog = null;
        try {
            blog = blogService.updateBlogById(id,blogDTO);
            return ResponseEntity.ok("Sửa blog thành công");
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> delete(@PathVariable int id){
        try {
            blogService.deleteBlog(id);
            return ResponseEntity.ok("Xóa blog thành công");
        } catch (DataNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
