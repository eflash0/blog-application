import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { NavigationBarComponent } from "../../navigation-bar/navigation-bar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../service/category.service';
import { AuthService } from '../../service/auth.service';
import { PostService } from '../../service/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-update-post',
  standalone: true,
  imports: [FooterComponent, NavigationBarComponent, FormsModule, CommonModule],
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.css'
})
export class UpdatePostComponent implements OnInit {
  post : any;
  categories : any;
  username : string = ''
  postId : number = 0;
  user : any;
  selectedFile : File | null = null;
  constructor(private categoryService : CategoryService,private authService : AuthService,
    private postService : PostService , private route : ActivatedRoute, private userService : UserService
    ,private router : Router) {}
  ngOnInit(): void {
    this.postId = +this.route.snapshot.paramMap.get('id')!;
    this.categoryService.getCategories().subscribe(
      response => {
        this.categories = response.map((category:any) => ({...category,selected:false}));
      },
      error => {console.error('error fetching categories',error);
      }
    );
    
    this.username = this.authService.extractUsername();
    this.postService.getPostById(this.postId).subscribe(
      response => {
        this.post = response;
      },
      error => {
        console.error('error fetching post',error);
        
      }
    );
  }

  update() : void{
    this.userService.findUserByUsername(this.username).subscribe(
      response => {
        this.user = response;
        this.post.author = this.user;
        const selectedCategories = this.categories.filter((category:any) => category.selected);
        this.post.categories = selectedCategories.map((category: any) => ({categoryId: category.categoryId, name: category.name}));

        this.postService.updatePost(this.post, this.selectedFile,this.postId).subscribe(
          response => {
            console.log('Post updated successfully', response);
            this.router.navigate(['/posts',this.postId]);
          },
          error => {console.error('Error updating post', error);}
        );
      },
      error => {console.error('Error fetching user', error);}
    );
  }

  onFileSelected(event : any){
    this.selectedFile = event.target.files[0];
  }
}
