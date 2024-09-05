package com.blog.blog.service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.blog.blog.dto.CommentDto;
import com.blog.blog.dto.PostDto;
import com.blog.blog.entity.Category;
import com.blog.blog.entity.Post;
import com.blog.blog.entity.User;
import com.blog.blog.repository.CategoryRepository;
import com.blog.blog.repository.PostRepository;
import com.blog.blog.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class PostService {
    @Autowired
    PostRepository postRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired 
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public PostDto findPostById(Long postId){
        Post post = postRepository.findById(postId).orElseThrow(() ->
        new IllegalArgumentException("post not found"));
        return modelMapper.map(post,PostDto.class);
    }

    public List<PostDto> getPosts(){
        List<Post> posts = postRepository.findAll();
        return posts.stream().map(post -> modelMapper.map(post,PostDto.class)).toList();
    }

    @Transactional
    public PostDto addPost(PostDto postDto,MultipartFile imageFile){
        Optional<User> authorPost = userRepository.findById(postDto.getAuthor().getUserId());
        if(!authorPost.isPresent()){
            throw new IllegalArgumentException("the user doesnt exist");
        }
        Post post = modelMapper.map(postDto,Post.class);
        if (imageFile != null && !imageFile.isEmpty()) {
            String fileName = imageFile.getOriginalFilename();
            if (fileName != null && uploadDir != null) {
                Path uploadDirectory = Paths.get(uploadDir);
                Path filePath = uploadDirectory.resolve(fileName);
    
                try {
                    Files.createDirectories(uploadDirectory);    
                    Files.write(filePath, imageFile.getBytes());
                    post.setImagePath(fileName);
                } catch (IOException e) {
                    throw new RuntimeException("Failed to store file: " + e.getMessage(), e);
                }
            }
        }
        List<Category> categories = postDto.getCategories()==null?Collections.emptyList():postDto.getCategories().stream()
        .map(categoryDto -> {
            Category category = modelMapper.map(categoryDto, Category.class);
            return categoryRepository.save(category); 
        }).toList();
        post.setCategories(categories);
        Post savedPost = postRepository.save(post);
        return modelMapper.map(savedPost,PostDto.class);
    }

    @Transactional
    public PostDto updatePost(PostDto postDto,MultipartFile imageFile,Long postId){
        Post existingPost = postRepository.findById(postId).orElseThrow(() ->
        new IllegalArgumentException("post not found"));
        if(postDto.getContent()!=null && !postDto.getContent().isEmpty()){
            existingPost.setContent(postDto.getContent());
        }
        if(postDto.getTitle()!=null && !postDto.getTitle().isEmpty()){
            existingPost.setTitle(postDto.getTitle());
        }
        if (imageFile != null && !imageFile.isEmpty()) {
            String fileName = imageFile.getOriginalFilename();
            if (fileName != null && uploadDir != null) {
                Path uploadDirectory = Paths.get(uploadDir);
                Path filePath = uploadDirectory.resolve(fileName);
    
                try {
                    Files.createDirectories(uploadDirectory);
    
                    Files.write(filePath, imageFile.getBytes());
                    existingPost.setImagePath(fileName);
                } catch (IOException e) {
                    throw new RuntimeException("Failed to store file: " + e.getMessage(), e);
                }
            }
        }
        if (postDto.getCategories() != null && !postDto.getCategories().isEmpty()) {
            List<Category> categories = postDto.getCategories().stream()
                .map(categoryDto -> categoryRepository.findById(categoryDto.getCategoryId())
                    .orElseThrow(() -> new IllegalArgumentException("Category not found: " + categoryDto.getCategoryId())))
                .collect(Collectors.toList());
            existingPost.setCategories(categories);
        }
        Post updatedPost = postRepository.save(existingPost);
        return modelMapper.map(updatedPost,PostDto.class);
    }

    public void deletePost(Long postId){
        postRepository.deleteById(postId);
    }

    public List<CommentDto> getPostComments(Long postId){
        Post post = postRepository.findById(postId).orElseThrow(() ->
        new IllegalArgumentException("post not found"));
        List<CommentDto> comments = post.getComments().stream().map(comment -> 
        modelMapper.map(comment,CommentDto.class)).toList();
        return comments;
    }

    public List<PostDto> findPostsByCategory(String categoryName){
        List<Post> posts = postRepository.findByCategories_Name(categoryName);
        return posts.stream().map(post -> modelMapper.map(post,PostDto.class)).toList();
    }

}
