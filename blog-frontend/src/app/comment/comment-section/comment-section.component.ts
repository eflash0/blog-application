import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../service/comment.service';
import { PostService } from '../../service/post.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../model/user';
import { Comment } from '../../model/comment';
import { AuthService } from '../../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent implements OnInit {
  @Input() postId : number = 0;
  comments : any[] = [];
  comment = new Comment('');
  replies : any;
  isAdmin : boolean = false;
  username : string = '';
  editingMode : boolean = false;
  editedComment = {content : ''};
  reply = new Comment('');

  constructor(private commentService : CommentService,private postService : PostService,
    private authService : AuthService,public dialog : MatDialog
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
          isEditing : false,
          addReply : false,
          replies: comment.replies.map((reply: any) => ({
            ...reply,
            isEditing : false,
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
    this.username =this.authService.extractUsername();
    console.log(this.username);
    
  }
  

  addComment(){
    const user = new User(this.username);
    this.comment.author = user;
    this.comment.postId = this.postId;
    this.commentService.addComment(this.comment).subscribe(
      response => {console.log('comment added succesfully');
        this.comment = new Comment(''); 
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

  deleteComment(id : number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data : {title : 'Deletion Confirmation',content : 'Are you sure you want to delete this comment or reply?'}
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if(result){
          this.commentService.deleteComment(id).subscribe(
            response => {this.ngOnInit();
            },
            error => {console.error('error deleting comment',error);
            }
          );
        }
      }
    );
  }

  modifyComment(comment : any){
    this.editedComment.content = comment.content;
    comment.isEditing = true;
  }

  cancelEdit(comment: any): void {
    comment.isEditing = false;
  }

  saveComment(comment: any) {
    this.commentService.modifyComment(this.editedComment,comment.commentId).subscribe(
      response => {
        comment.isEditing = false;
        this.ngOnInit();
      },
      error => {console.error('error editing comment',error);
      }
    );
  }

  toggleReplyForm(comment : any){
    comment.addReply = true;
  }

  cancelReply(comment : any){
    comment.addReply = false;
  }

  addReply(comment : any){
    const user = new User(this.username);
    this.reply.author = user;
    this.commentService.addReply(this.reply,comment.commentId).subscribe(
      response => {
        comment.addReply = false;
        this.reply.content = '';
        this.ngOnInit();
      },
      error => {
        console.error('error adding reply',error);
      }
    );
  }
}
