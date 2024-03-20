package com.example.shopclothes.service;

import com.example.shopclothes.dto.BlogDTO;
import com.example.shopclothes.entity.Blog;
import com.example.shopclothes.entity.Image;
import com.example.shopclothes.entity.Tag;
import com.example.shopclothes.entity.User;
import com.example.shopclothes.exception.DataNotFoundException;
import com.example.shopclothes.repository.BlogRepository;
import com.example.shopclothes.repository.ImageRepository;
import com.example.shopclothes.repository.TagRepository;
import com.example.shopclothes.repository.UserRepository;
import com.example.shopclothes.service.Imp.IBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class BlogService implements IBlogService {

    @Autowired
    BlogRepository blogRepository;

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public List<Blog> getList() {
        return blogRepository.findAll(Sort.by("id").descending());
    }

    @Override
    public List<Blog> getListBlogNew(int limit) {
        List<Blog> list = blogRepository.getListBlogNewe(limit);
        return list;
    }

    @Override
    public Blog getBlogById(int id) throws DataNotFoundException {
        Blog blog = blogRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Không tìm thấy blog id: " + id));
        return blog;
    }

    @Override
    public Blog createBlog(BlogDTO blogDTO) throws DataNotFoundException {
        Blog blog = new Blog();
        blog.setTitle(blogDTO.getTitle());
        blog.setDescription(blogDTO.getDescription());
        blog.setContent(blogDTO.getContent());
        Image image = imageRepository.findById(blogDTO.getImageId()).orElseThrow(() -> new DataNotFoundException("Không tìm thấy image id: " + blogDTO.getImageId()));
        blog.setImage(image);
        User user = userRepository.findByUserName(blogDTO.getUsername());
        if (user == null){
            throw new DataNotFoundException("Không tìm thấy username");
        }
        blog.setUser(user);
        blog.setCreateAt(new Timestamp(System.currentTimeMillis()));
        Set<Tag> tags = new HashSet<>();
        for(var item : blogDTO.getTags()){
            Tag tag = tagRepository.findById(item).orElseThrow(() -> new DataNotFoundException("Không tìm thấy tag id: " + item));
            tags.add(tag);
        }
        blog.setTags(tags);
        blogRepository.save(blog);
        return blog;
    }

    @Override
    public Blog updateBlogById(int id, BlogDTO blogDTO) throws DataNotFoundException {
        Blog blog = blogRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Không tìm thấy blog id: " + id));
        blog.setTitle(blogDTO.getTitle());
        blog.setDescription(blogDTO.getDescription());
        blog.setContent(blogDTO.getContent());
        Image image = imageRepository.findById(blogDTO.getImageId()).orElseThrow(() -> new DataNotFoundException("Không tìm thấy image id: " + blogDTO.getImageId()));
        blog.setImage(image);
        Set<Tag> tags = new HashSet<>();
        for(var item : blogDTO.getTags()){
            Tag tag = tagRepository.findById(item).orElseThrow(() -> new DataNotFoundException("Không tìm thấy tag id: " + item));
            tags.add(tag);
        }
        User user = userRepository.findByUserName(blogDTO.getUsername());
        blog.setUser(user);
        blog.setTags(tags);
        blogRepository.save(blog);
        return blog;
    }

    @Override
    public void deleteBlog(int id) throws DataNotFoundException {
        Blog blog = blogRepository.findById(id).orElseThrow(() -> new DataNotFoundException("Không tìm thấy blog id: " + id));
        blog.getTags().remove(this);
        blogRepository.delete(blog);
    }
}
