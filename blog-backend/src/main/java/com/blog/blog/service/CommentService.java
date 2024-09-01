package com.blog.blog.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blog.blog.dto.CommentDto;
import com.blog.blog.entity.Comment;
import com.blog.blog.entity.Post;
import com.blog.blog.repository.CommentRepository;
import com.blog.blog.repository.PostRepository;

@Service
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PostRepository postRepository;

    public List<CommentDto> getAllComments(){
        List<Comment> comments = commentRepository.findAll();
        return comments.stream().map(comment -> modelMapper.map(comment,CommentDto.class)).toList();
    }

    public CommentDto findCommentById(Long commentId){
        Comment comment = commentRepository.findById(commentId).orElseThrow(() ->
        new IllegalArgumentException("comment not found"));
        return modelMapper.map(comment, CommentDto.class);
    }

    public CommentDto addComment(CommentDto commentDto){
        Optional<Post> existingPost = postRepository.findById(commentDto.getPostId());
        if(!existingPost.isPresent()){
            throw new IllegalArgumentException("the post doesnt exist");
        }
        Comment comment = modelMapper.map(commentDto, Comment.class);
        if(existingPost.get().getComments().contains(comment)){
             throw new IllegalArgumentException("comment already exists");
        }
        existingPost.get().getComments().add(comment);
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

    public CommentDto addReply(CommentDto replyDto,Long id){
        Optional<Comment> commentOpt = commentRepository.findById(id);
        if(!commentOpt.isPresent()){
            throw new IllegalArgumentException("comment parent doesnt found");
        }
        replyDto.setParentCommentId(id);
        Comment parentComment = commentOpt.get();
        Comment reply = modelMapper.map(replyDto,Comment.class);
        if(!parentComment.getReplies().contains(reply)){
            parentComment.getReplies().add(reply);
        }
        Comment savedComment = commentRepository.save(parentComment);
        return modelMapper.map(savedComment,CommentDto.class);
    }

}
