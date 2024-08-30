import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { NavigationBarComponent } from "../../navigation-bar/navigation-bar.component";
import { Post } from '../../model/post';
import { PostService } from '../../service/post.service';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FooterComponent, NavigationBarComponent , FormsModule , CommonModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {
  post = new Post('','');
  categories : any;
  id : number = 1; 
  user : any;
  constructor(private postService : PostService,private categoryService : CategoryService,
    private userService : UserService , private router : Router
  ) {}

  ngOnInit(): void {
      this.categoryService.getCategories().subscribe(
        response => {
          this.categories = response.map((category:any) => ({...category,selected:false}));
        },
        error => {console.error('error fetching categories',error);
        }
      );
  }

  create() : void{
    this.userService.findUserById(this.id).subscribe(
      response => {
        this.user = response;
        this.post.author = this.user;
        const selectedCategories = this.categories.filter((category:any) => category.selected);
        // this.post.authorId = Number(localStorage.getItem('userId'));
        console.log(this.post);
        this.post.categories = selectedCategories.map((category: any) => ({categoryId : category.categoryId,name : category.name}));
        this.postService.addPost(this.post).subscribe(
          response => {
            console.log('post added with success',response);
            this.router.navigate(['/get-posts']);
          },
          error => {console.error('error adding post',error);}
        );
      },
      error => {console.error('error fetching user',error);
      }
    );
  }
}
