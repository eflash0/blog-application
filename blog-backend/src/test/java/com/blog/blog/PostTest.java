package com.blog.blog;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;

import com.blog.blog.dto.PostDto;
import com.blog.blog.entity.Post;
import com.blog.blog.repository.PostRepository;
import com.blog.blog.service.PostService;

@SpringBootTest
public class PostTest {
    @Mock
    private PostRepository postRepository;

    @Mock 
    private ModelMapper modelMapper;

    @InjectMocks
    private PostService postService;

    private Post post;
    private PostDto postDto;

    @BeforeEach
    void setup(){
        post = new Post();
        post.setTitle("test");
        post.setContent("test test");

        postDto = new PostDto();
        postDto.setTitle("test");
        postDto.setContent("test test");
    }

    @Test
    public void addPostTest(){
        when(postRepository.findById(postDto.getPostId())).thenReturn(Optional.empty());
        when(modelMapper.map(postDto, Post.class)).thenReturn(post);
        when(postRepository.save(post)).thenReturn(post);
        when(modelMapper.map(post, PostDto.class)).thenReturn(postDto);
        PostDto result = postService.addPost(postDto);
        assertNotNull(result);
        assertEquals(postDto.getPostId(), result.getPostId());
        assertEquals(postDto.getTitle(), result.getTitle());
        assertEquals(postDto.getContent(), result.getContent());
        verify(postRepository).findById(postDto.getPostId());
        verify(postRepository).save(post);
        verify(modelMapper).map(postDto, Post.class);
        verify(modelMapper).map(post, PostDto.class);
    }

}
