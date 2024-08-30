import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from "../../navigation-bar/navigation-bar.component";
import { PostService } from '../../service/post.service';
import { CommentService } from '../../service/comment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [NavigationBarComponent],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {
  constructor(private route : ActivatedRoute, postService:PostService,private commentService:CommentService) {}
  ngOnInit(): void {
      const id = +this.route.snapshot.paramMap.get('id')!;
  }
}
