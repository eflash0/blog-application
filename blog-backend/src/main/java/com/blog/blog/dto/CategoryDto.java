package com.blog.blog.dto;

import java.util.List;

import com.blog.blog.entity.Post;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class CategoryDto {
    Long categoryId;
    String name;
    List<Post> posts;
}
