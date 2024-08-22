package com.blog.blog.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostDto {
    private Long postId;
    private String title;
    private String content;
    private Long authorId;
    private List<CommentDto> comments;
    private String categoryName;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
