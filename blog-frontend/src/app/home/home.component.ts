import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";
import { CommonModule, DatePipe } from '@angular/common';
import { TruncatePipe } from "../truncate.pipe";
import { Router } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, NavigationBarComponent, CommonModule, TruncatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  categories : any[] = [];
  latestPosts : any[] = [];
  constructor(private router : Router,private categoryService : CategoryService,private postService : PostService){}
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      response => {this.categories = response;
      },
      error => {console.error('error fetching categories',error);}
    );
    this.postService.getPosts().subscribe(
      response => {this.latestPosts = response.slice(0,3).map(
        ((post:any) => ({
          ...post,
          createdAt : new Date(
            post.createdAt[0],  
            post.createdAt[1] - 1,  
            post.createdAt[2], 
            post.createdAt[3],  
            post.createdAt[4],
            post.createdAt[5],
            post.createdAt[6] / 1000000
          )
        }))
      );},
      error => {console.error('error fetching posts',error);}
    );
  }
  viewCategoryPosts(category : string){
    this.router.navigate(['/get-posts'], { queryParams: { name: category } });
  }

  explorePosts(){
    this.router.navigate(['get-posts']);
  }

  userProfile(id : number){
    this.router.navigate(['/users',id]);
  }

  postDetails(id : number){
    this.router.navigate(['/posts',id]);
  }
}
