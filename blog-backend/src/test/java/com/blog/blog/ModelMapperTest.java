package com.blog.blog;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.modelmapper.ModelMapper;
import org.springframework.boot.test.context.SpringBootTest;

import com.blog.blog.dto.CommentDto;
import com.blog.blog.entity.Comment;
import com.blog.blog.entity.Post;
import com.blog.blog.repository.CommentRepository;
import com.blog.blog.repository.PostRepository;

@SpringBootTest
public class ModelMapperTest {
    @InjectMocks
    private ModelMapper modelMapper;

    @Mock
    private PostRepository postRepository;

    @Mock
    private CommentRepository commentRepository;

    private CommentDto comment;
    private Post post;
    private Comment parent;

    @BeforeEach
    public void setup(){
        comment = new CommentDto(3L,"hey", 2L, 1L);
        post = new Post();
        post.setPostId(2L);
        post.setContent("fepokf");
        parent = new Comment();
        parent.setCommentId(1L);
        parent.setContent("parent");

        modelMapper.typeMap(CommentDto.class, Comment.class).setConverter(
            context -> {
                CommentDto commentDto = context.getSource();
                Comment comment = new Comment();
                if(commentDto.getCommentId() != null){
                    comment.setCommentId(commentDto.getCommentId());
                }
                comment.setContent(commentDto.getContent());
                if(commentDto.getPostId() != null){
                    comment.setPost(postRepository.findById(commentDto.getPostId()).orElse(null));
                }
                if(commentDto.getParentCommentId() !=null){
                    comment.setParentComment(commentRepository.findById(commentDto.getParentCommentId()).orElse(null));
                }
                return comment;
            }
        );
    }

    @Test
    public void mapCommentDtoToCommentTest(){
        when(commentRepository.findById(1L)).thenReturn(Optional.of(parent));
        when(postRepository.findById(2L)).thenReturn(Optional.of(post));
        Comment rslt = modelMapper.map(comment,Comment.class);
        assertNotNull(rslt);
        assertEquals(rslt.getParentComment(),parent);
        assertEquals(rslt.getPost(),post);
        assertEquals(rslt.getContent(),comment.getContent());
    }
}
