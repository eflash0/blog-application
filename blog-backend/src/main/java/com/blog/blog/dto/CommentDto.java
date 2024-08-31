package com.blog.blog.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {
    private Long commentId;
    private String content;
    private Long postId;
    private Long parentCommentId;
    private UserDto author;
    private LocalDateTime createdAt;
    public CommentDto(Long commentId, String content, Long postId, Long parentCommentId) {
        this.commentId = commentId;
        this.content = content;
        this.postId = postId;
        this.parentCommentId = parentCommentId;
    }
    
}
