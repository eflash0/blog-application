package com.blog.blog.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.blog.blog.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {

    List<Post> findByCategories_Name(String categoryName);

    @Query("SELECT p FROM Post p ORDER BY p.createdAt DESC")
    List<Post> findLatestPosts(Pageable pageable);
}
