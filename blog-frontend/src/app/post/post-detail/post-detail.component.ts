import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from "../../navigation-bar/navigation-bar.component";
import { PostService } from '../../service/post.service';
import { CommentService } from '../../service/comment.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe,CommonModule } from '@angular/common';
import { FooterComponent } from "../../footer/footer.component";
import { CommentSectionComponent } from "../../comment/comment-section/comment-section.component";

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [NavigationBarComponent, DatePipe, CommonModule, FooterComponent, CommentSectionComponent],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {
  post : any;
  constructor(private route : ActivatedRoute,private postService:PostService,private commentService:CommentService) {}
  ngOnInit(): void {
      const id = +this.route.snapshot.paramMap.get('id')!;
      if(id){
        this.postService.getPostById(id).subscribe(
          response => {this.post = {...response,
            createdAt : new Date(
              response.createdAt[0],
              response.createdAt[1]-1,
              response.createdAt[2],
              response.createdAt[3],
              response.createdAt[4],
              response.createdAt[5],
              response.createdAt[6]/1000000
            )
          };
          console.log(this.post);
          
          },
          error => {console.error('error fetching post',error);
          }
        );
      }
      
  }
}
