import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";
import { CommonModule } from '@angular/common';
import { TruncatePipe } from "../truncate.pipe";
import { Router } from '@angular/router';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, NavigationBarComponent, CommonModule, TruncatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  categories : any;
  latestPosts : any;
  constructor(private router : Router,private categoryService : CategoryService){}
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      response => {this.categories = response;
      },
      error => {console.error('error fetching categories',error);}
    );
  }
  viewCategoryPosts(id : number){

  }

  explorePosts(){

  }

  userProfile(id : number){
    this.router.navigate(['/users',id]);
  }

  postDetails(id : number){
    this.router.navigate(['/posts',id]);
  }
}
