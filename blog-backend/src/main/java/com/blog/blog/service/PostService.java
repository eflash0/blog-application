package com.blog.blog.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.blog.dto.CommentDto;
import com.blog.blog.dto.PostDto;
import com.blog.blog.entity.Category;
import com.blog.blog.entity.Post;
import com.blog.blog.repository.CategoryRepository;
import com.blog.blog.repository.PostRepository;

@Service
public class PostService {
    @Autowired
    PostRepository postRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapper;

    public PostDto findPostById(Long postId){
        Post post = postRepository.findById(postId).orElseThrow(() ->
        new IllegalArgumentException("post not found"));
        return modelMapper.map(post,PostDto.class);
    }

    public List<PostDto> getPosts(){
        List<Post> posts = postRepository.findAll();
        return posts.stream().map(post -> modelMapper.map(post,PostDto.class)).toList();
    }

    public PostDto addPost(PostDto postDto){
        Optional<Post> existingPost = postRepository.findById(postDto.getPostId());
        if(existingPost.isPresent()){
            throw new IllegalArgumentException("the post already exists");
        }
        Post post = modelMapper.map(postDto,Post.class);
        Post savedPost = postRepository.save(post);
        return modelMapper.map(savedPost,PostDto.class);
    }

    public PostDto updatePost(PostDto postDto,Long postId){
        Post existingPost = postRepository.findById(postId).orElseThrow(() ->
        new IllegalArgumentException("post not found"));
        if(postDto.getContent()!=null && postDto.getContent().isEmpty()){
            existingPost.setContent(postDto.getContent());
        }
        if(postDto.getTitle()!=null && postDto.getTitle().isEmpty()){
            existingPost.setTitle(postDto.getTitle());
        }
        // if(postDto.getCategoryName()!=null && !postDto.getCategoryName().isEmpty()){
        //     Category category = categoryRepository.findByName(postDto.getCategoryName()).orElseThrow(
        //     () -> new IllegalArgumentException("category not found"));
        //     existingPost.setCategory(category);
        // }
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
