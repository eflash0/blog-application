package com.blog.blog.config;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Collections;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.blog.blog.dto.CategoryDto;
import com.blog.blog.dto.CommentDto;
import com.blog.blog.dto.PostDto;
import com.blog.blog.entity.Category;
import com.blog.blog.entity.Comment;
import com.blog.blog.entity.Post;
import com.blog.blog.repository.CommentRepository;
import com.blog.blog.repository.PostRepository;
import com.blog.blog.repository.UserRepository;

@Configuration
public class ModelMapperConfig {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Bean
    public ModelMapper modelMapper(){
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.addMappings(new PropertyMap<PostDto, Post>() {
            @Override
            protected void configure() {

                using(ctx -> {
                    List<CategoryDto> categoryDtos = ((PostDto) ctx.getSource()).getCategories();
                    return categoryDtos == null ? Collections.emptyList() : categoryDtos.stream()
                        .map(categoryDto -> modelMapper.map(categoryDto, Category.class))
                        .toList();
                }).map(source, destination.getCategories());
        
                using(ctx -> {
                    List<CommentDto> commentDtos = ((PostDto) ctx.getSource()).getComments();
                    return commentDtos == null ? Collections.emptyList() : commentDtos.stream()
                        .map(commentDto -> modelMapper.map(commentDto, Comment.class))
                        .toList();
                }).map(source, destination.getComments());
            }
        });

        modelMapper.addMappings(new PropertyMap<Post, PostDto>() {
            @Override
            protected void configure() {

                using(ctx -> {
                    Post post = (Post) ctx.getSource();
                    List<Comment> comments = post.getComments();
                    if (comments == null) {
                        return Collections.emptyList();
                    }
                    return comments.stream()
                                   .map(comment -> modelMapper.map(comment, CommentDto.class))
                                   .toList();
                }).map(source, destination.getComments());
            }
        });

        // modelMapper.addMappings(new PropertyMap<CommentDto,Comment>() {
        //     @Override
        //     public void configure(){
        //         using(ctx ->{
        //             Long postId = ((CommentDto)ctx.getSource()).getPostId();
        //             return postRepository.findById(postId).orElse(null);
        //         }).map(source,destination.getPost());
        //     }
        // });

        modelMapper.addMappings(new PropertyMap<Comment,CommentDto>() {
            @Override
            public void configure(){
                map().setPostId(source.getPost().getPostId());
                map().setParentCommentId(source.getParentComment().getCommentId());
            }
        });

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
                if(commentDto.getParentCommentId() != null){
                    comment.setParentComment(commentRepository.findById(commentDto.getParentCommentId()).orElse(null));
                }
                if(commentDto.getAuthor() != null){
                    comment.setAuthor(userRepository.findById(commentDto.getAuthor().getUserId()).orElse(null));
                }
                if(commentDto.getCreatedAt() != null){
                    comment.setCreatedAt(commentDto.getCreatedAt());
                }
                if (commentDto.getReplies() != null) {
                    List<Comment> replies = commentDto.getReplies().stream()
                        .map(replyDto -> modelMapper.map(replyDto, Comment.class))
                        .collect(Collectors.toList());
                    comment.setReplies(replies);
                }
                return comment;
            }
        );

        return modelMapper;
    }
}
