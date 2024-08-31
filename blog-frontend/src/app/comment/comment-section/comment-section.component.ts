import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../service/comment.service';
import { PostService } from '../../service/post.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent implements OnInit {
  @Input() postId : number = 0;
  comments : any[] = [];
  constructor(private commentService : CommentService,private postService : PostService) { }
  ngOnInit(): void {
    // this.postService.getPostComments(this.postId).subscribe(
    //   response => {this.comments = response.map((comment:any) => ({...comment,
    //     createdAt : new Date(
    //       comment.createdAt[0],
    //       comment.createdAt[1]-1,
    //       comment.createdAt[2],
    //       comment.createdAt[3],
    //       comment.createdAt[4],
    //       comment.createdAt[5],
    //       comment.createdAt[6]/1000000
    //     )
    //   }))},
    //   error => {console.error('error fetching comments',error);}
    // );
  }
}
