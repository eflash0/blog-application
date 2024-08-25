package com.blog.blog;

import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;

import com.blog.blog.dto.PostDto;
import com.blog.blog.entity.Post;
import com.blog.blog.repository.PostRepository;
import com.blog.blog.service.PostSevice;

@SpringBootTest
public class PostTest {
    @Mock
    private PostRepository postRepository;

    @Mock 
    private ModelMapper modelMapper;

    @InjectMocks
    private PostSevice postSevice;

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
}
