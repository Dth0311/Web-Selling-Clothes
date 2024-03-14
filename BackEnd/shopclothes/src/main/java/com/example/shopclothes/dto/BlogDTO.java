package com.example.shopclothes.dto;

import com.example.shopclothes.entity.Blog;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BlogDTO {

    private String title;

    private String description;

    private String content;

    private int imageId;

    private String username;

    private Set<Integer> tags = new HashSet<>();

    public static BlogDTO fromBlog(Blog blog){
        BlogDTO blogDTO = new BlogDTO();
        blogDTO.setTitle(blog.getTitle());
        blogDTO.setDescription(blog.getDescription());
        blogDTO.setContent(blog.getContent());
        blogDTO.setImageId(blog.getImage().getId());
        blogDTO.setUsername(blog.getUser().getUsername());
        Set<Integer> listTag = new HashSet<>();
        if(!blog.getTags().isEmpty()){
            for (var item:blog.getTags()) {
                listTag.add((int) item.getId());
            }
            blogDTO.setTags(listTag);
        }
        return blogDTO;
    }
}
