package com.example.shopclothes.service.Imp;

import com.example.shopclothes.dto.BlogDTO;
import com.example.shopclothes.entity.Blog;
import com.example.shopclothes.exception.DataNotFoundException;

import java.util.List;

public interface IBlogService {

    List<Blog> getList();

    List<Blog> getListBlogNew(int limit);

    Blog getBlogById(int id) throws DataNotFoundException;

    Blog createBlog(BlogDTO blogDTO) throws DataNotFoundException;

    Blog updateBlogById(int id,BlogDTO blogDTO) throws DataNotFoundException;

    void deleteBlog(int id) throws DataNotFoundException;
}
