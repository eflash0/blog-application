import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { NavigationBarComponent } from "../../navigation-bar/navigation-bar.component";
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../truncate.pipe';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FooterComponent, NavigationBarComponent, CommonModule, TruncatePipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  username : string = '';
  user : any;
  userId : number = 0;
  posts : any[] = [];
  postsPerPage : number = 6;
  currentPage : number = 1;
  paginatedPosts : any
  constructor(private userService : UserService,private authService : AuthService) { }

  ngOnInit(): void {
    this.userId = history.state.userId;
    this.username = this.authService.extractUsername();
    this.userService.findUserByUsername(this.username).subscribe(
      response => {
        this.user = response;
        console.log(this.user.userId);
        
      },
      error => {console.error('error fetching user',error);}
    );

    this.userService.getUserPosts(this.userId).subscribe(
      response => { 
        this.posts = response.map((post:any) => {
          ({...post,
            createAt : new Date(
              post.createdAt[0],  
              post.createdAt[1] - 1,  
              post.createdAt[2], 
              post.createdAt[3],  
              post.createdAt[4],
              post.createdAt[5],
              post.createdAt[6] / 1000000
            )
          })
        });
      },
      error => {
        console.error('error fetching posts',error);
        
      }
    );
  }

  getTotalPages(): number[] {
    const totalPages = Math.ceil(this.posts.length / this.postsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  changePage(page : number):void{
    this.currentPage = page;
    this.updatePaginatedPosts();
  }

  nextPage():void{
    if((this.posts.length/6)>this.currentPage){
      this.currentPage++;
      this.updatePaginatedPosts();
    }   
  }

  previousPage():void{
    if(this.currentPage>1){
      this.currentPage--;
      this.updatePaginatedPosts();
    }
  }

  updatePaginatedPosts():void{
    const startIndex = (this.currentPage-1)*this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    console.log(this.posts.length);
    this.paginatedPosts = this.posts.slice(startIndex,endIndex);
  }

  postDetails(id : number){

  }

}
