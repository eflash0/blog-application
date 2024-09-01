import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../service/comment.service';
import { PostService } from '../../service/post.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../model/user';
import { Comment } from '../../model/comment';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent implements OnInit {
  @Input() postId : number = 1;
  comments : any[] = [];
  comment = new Comment('');
  replies : any;
  isAdmin : boolean = false;
  constructor(private commentService : CommentService,private postService : PostService,
    private authService : AuthService
  ) { }
  ngOnInit(): void {
    this.postService.getPostComments(this.postId).subscribe(
      response => {
        this.comments = response.map((comment: any) => ({
          ...comment,
          createdAt: new Date(
            comment.createdAt[0],
            comment.createdAt[1] - 1,
            comment.createdAt[2],
            comment.createdAt[3],
            comment.createdAt[4],
            comment.createdAt[5],
            comment.createdAt[6] / 1000000
          ),
          showReplies: false,
          replies: comment.replies.map((reply: any) => ({
            ...reply,
            createdAt: new Date(
              reply.createdAt[0],
              reply.createdAt[1] - 1,
              reply.createdAt[2],
              reply.createdAt[3],
              reply.createdAt[4],
              reply.createdAt[5],
              reply.createdAt[6] / 1000
            )
          }))
        }));
      },
      error => {
        console.error('error fetching comments', error);
      }
    );
    this.isAdmin = this.authService.isAdmin();    
  }
  

  addComment(){
    const user = new User('abdo',1);
    this.comment.author = user;
    this.comment.postId = this.postId;
    this.commentService.addComment(this.comment).subscribe(
      response => {console.log('comment added succesfully');
        this.ngOnInit();
      },
      error => {console.error('error addding the comment',error);}
    );
  }

  toggleReplies(comment : any){
    // if(comment.showReplies === false){
    //   console.log(comment.commentId);
    
    //   this.commentService.getCommentReplies(Number(comment.commentId)).subscribe(
    //     response => {comment.replies = response;
    //       comment.showReplies = !comment.showReplies;
    //     },
    //     error => {console.error('error fetching replies',error);
    //     }
    //   );
    // }
    // else{
    //   comment.showReplies = !comment.showReplies;
    // }
    comment.showReplies = !comment.showReplies;
  }
}
