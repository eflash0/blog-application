package com.blog.blog.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.blog.dto.CommentDto;
import com.blog.blog.entity.Comment;
import com.blog.blog.repository.CommentRepository;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ModelMapper modelMapper;

    public CommentDto findCommentById(Long commentId){
        Comment comment = commentRepository.findById(commentId).orElseThrow(() ->
        new IllegalArgumentException("comment not found"));
        return modelMapper.map(comment, CommentDto.class);
    }

    public CommentDto addComment(CommentDto commentDto){
        Optional<Comment> existingComment = commentRepository.findById(commentDto.getCommentId());
        if(existingComment.isPresent()){
            throw new IllegalArgumentException("the comment already exists");
        }
        Comment comment = modelMapper.map(commentDto, Comment.class);
        Comment savedComment = commentRepository.save(comment);
        return modelMapper.map(savedComment,CommentDto.class);
    }

    public CommentDto modifyComment(CommentDto commentDto,Long commentId){
        Comment existingComment = commentRepository.findById(commentId).orElseThrow(() ->
        new IllegalArgumentException("comment not found"));
        if(commentDto.getContent() != null && !commentDto.getContent().isEmpty()){
            existingComment.setContent(commentDto.getContent());
        }
        Comment comment = commentRepository.save(existingComment);
        return modelMapper.map(comment,CommentDto.class);
    }

    public void deleteComment(Long commentId){
        commentRepository.deleteById(commentId);
    }

    public List<CommentDto> getCommentReplies(Long commentId){
        Comment comment = commentRepository.findById(commentId).orElseThrow(() ->
        new IllegalArgumentException("comment not found"));
        return comment.getReplies().stream()
        .map(reply -> modelMapper.map(reply,CommentDto.class))
        .collect(Collectors.toList());
    }

}
