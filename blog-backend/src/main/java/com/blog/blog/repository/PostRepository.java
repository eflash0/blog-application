package com.blog.blog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blog.blog.entity.Post;

public interface PostRepository extends JpaRepository<Post,Long> {

}
