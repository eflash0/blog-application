import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from "../../side-bar/side-bar.component";
import { NavigationBarComponent } from "../../navigation-bar/navigation-bar.component";
import { FooterComponent } from "../../footer/footer.component";
import { PostService } from '../../service/post.service';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-get-posts',
  standalone: true,
  imports: [DatePipe, CommonModule, SideBarComponent, NavigationBarComponent, FooterComponent],
  templateUrl: './get-posts.component.html',
  styleUrl: './get-posts.component.css'
})
export class GetPostsComponent implements OnInit {
  post : any;
  constructor(private postService : PostService,private userService : UserService) {}
  ngOnInit(): void {
      this.postService.getPosts().subscribe(
        response => {this.post = response;},
        error => {console.error('error fetching posts',error);
        }
      );
  }
  getAuthorName(id : number) : any{
    this.userService.findUserById(id).subscribe(
      response => {return response.username;},
      error => {
        console.error('error fetching user',error);
        return null;
      }
    );
  }
}
