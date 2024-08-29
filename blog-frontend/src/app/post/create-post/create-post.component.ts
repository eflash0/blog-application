import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { NavigationBarComponent } from "../../navigation-bar/navigation-bar.component";
import { Post } from '../../model/post';
import { PostService } from '../../service/post.service';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FooterComponent, NavigationBarComponent , FormsModule , CommonModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {
  post = new Post('','',1);
  categories : any;
  constructor(private postService : PostService,private categoryService : CategoryService) {}

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
    const selectedCategories = this.categories.filter((category:any) => category.selected);
    // this.post.authorId = Number(localStorage.getItem('userId'));
    console.log(this.post);
    this.post.categories = selectedCategories.map((category: any) => ({categoryId : category.categoryId,name : category.name}));
    this.postService.addPost(this.post).subscribe(
      response => {
        console.log('post added with success',response);
      },
      error => {console.error('error adding post',error);}
    );
  }
}
