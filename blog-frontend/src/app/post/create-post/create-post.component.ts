import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { NavigationBarComponent } from "../../navigation-bar/navigation-bar.component";
import { Post } from '../../model/post';
import { PostService } from '../../service/post.service';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

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
  username : string = ''; 
  user : any;
  selectedFile: File | null = null;
  constructor(private postService : PostService,private categoryService : CategoryService,
    private userService : UserService , private router : Router ,private authService : AuthService,
  ) {}

  ngOnInit(): void {
      this.categoryService.getCategories().subscribe(
        response => {
          this.categories = response.map((category:any) => ({...category,selected:false}));
        },
        error => {console.error('error fetching categories',error);
        }
      );
      this.username = this.authService.extractUsername();
  }

  create() : void{
    
    this.userService.findUserByUsername(this.username).subscribe(
      response => {
        this.user = response;
        this.post.author = this.user;
        const selectedCategories = this.categories.filter((category:any) => category.selected);
        this.post.categories = selectedCategories.map((category: any) => ({categoryId: category.categoryId, name: category.name}));

        this.postService.addPost(this.post, this.selectedFile).subscribe(
          response => {
            console.log('Post added successfully', response);
            this.router.navigate(['/get-posts']);
          },
          error => {console.error('Error adding post', error);}
        );
      },
      error => {console.error('Error fetching user', error);}
    );
  }

  onFileSelected(event : any){
    this.selectedFile = event.target.files[0];
  }


}
