package com.blog.blog.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.blog.blog.dto.CommentDto;
import com.blog.blog.dto.PostDto;
import com.blog.blog.service.PostService;

@RestController
@RequestMapping(path = "/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getPost(@PathVariable Long id){
        PostDto post = postService.findPostById(id);
        return ResponseEntity.ok(post);
    }

    @GetMapping
    public ResponseEntity<List<PostDto>> getAllPosts(){
        List<PostDto> posts = postService.getPosts();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<List<CommentDto>> getPostComments(@PathVariable Long id){
        List<CommentDto> comments = postService.getPostComments(id);
        return ResponseEntity.ok(comments);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PostDto> createPost(@RequestPart("post") PostDto postDto, 
        @RequestPart("file") MultipartFile imageFile) {
        PostDto post = postService.addPost(postDto, imageFile);
        return ResponseEntity.ok(post);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PostDto> updatePost(@RequestBody PostDto postDto,
        @RequestPart("file") MultipartFile imageFile,@PathVariable Long id){
        PostDto post = postService.updatePost(postDto,imageFile, id);
        return ResponseEntity.ok(post);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id){
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/byCategory")
    public ResponseEntity<List<PostDto>> getPostsByCategory(@RequestParam("category") String category){
        List<PostDto> posts = postService.findPostsByCategory(category);
        return ResponseEntity.ok(posts);
    }


}
