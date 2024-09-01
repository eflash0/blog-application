package com.blog.blog.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.blog.dto.CommentDto;
import com.blog.blog.service.CommentService;

@RestController
@RequestMapping(path = "/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping
    public ResponseEntity<List<CommentDto>> getComments(){
        List<CommentDto> comments = commentService.getAllComments();
        return ResponseEntity.ok(comments);
    }

    @PostMapping
    public ResponseEntity<CommentDto> addComment(@RequestBody CommentDto comment){
        CommentDto addedComment = commentService.addComment(comment);
        return ResponseEntity.ok(addedComment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommentDto> modifyComment(@RequestBody CommentDto commentDto
    ,@PathVariable Long id){
        try{
            CommentDto comment = commentService.modifyComment(commentDto, id);
            return ResponseEntity.ok(comment);
        }
        catch(IllegalArgumentException ex){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        catch(Exception ex){
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id){
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/replies")
    public ResponseEntity<List<CommentDto>> getCommentReplies(@PathVariable Long id){
        List<CommentDto> replies = commentService.getCommentReplies(id);
        return ResponseEntity.ok(replies);
    }

    @PostMapping("/{id}/reply")
    public ResponseEntity<CommentDto> addReply(@RequestBody CommentDto reply,@PathVariable Long id){
        CommentDto parentCommentDto = commentService.addReply(reply,id);
        return ResponseEntity.ok(parentCommentDto);
    }
}
