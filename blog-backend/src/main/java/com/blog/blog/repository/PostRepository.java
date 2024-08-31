package com.blog.blog.repository;

import java.util.List;

import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.blog.blog.entity.Post;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {

    List<Post> findByCategories_Name(String categoryName);
}
