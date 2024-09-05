import { Component, OnInit } from '@angular/core';
import { NavigationBarComponent } from "../../navigation-bar/navigation-bar.component";
import { PostService } from '../../service/post.service';
import { CommentService } from '../../service/comment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe,CommonModule } from '@angular/common';
import { FooterComponent } from "../../footer/footer.component";
import { CommentSectionComponent } from "../../comment/comment-section/comment-section.component";
import { AuthService } from '../../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { state } from '@angular/animations';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [NavigationBarComponent, DatePipe, CommonModule, FooterComponent, CommentSectionComponent],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {
  post : any;
  username : string = '';
  isAdmin : boolean = false;
  constructor(private route : ActivatedRoute,private postService:PostService,
    private authService : AuthService,private router : Router,private dialog : MatDialog) {}
  ngOnInit(): void {
      this.username = this.authService.extractUsername();
      this.isAdmin = this.authService.isAdmin();
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

  deletePost(id : number){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data : {title : 'Deletion Confirmation' , content : 'Are you sure you want to delete this post?'}
    });
    dialogRef.afterClosed().subscribe(
      response => {
        if(response){
          this.postService.deletePost(id).subscribe(
            response => {
              this.router.navigate(['/get-posts']);
            },
            error => {console.error('error deleting post',error);}
          );
        }
      }
    ); 
  }

  editPost(id : number){
    this.router.navigate(['updatePost',id]);
  }

  userProfile(id : number){
    this.router.navigate(['users',id])
  }
}
