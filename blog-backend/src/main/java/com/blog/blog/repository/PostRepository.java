package com.blog.blog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.blog.blog.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {

    @Query("SELECT p FROM Post p WHERE p.category.name = :categoryName")
    List<Post> findPostsByCategory(@Param("categoryName") String categoryName);
}
