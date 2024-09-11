import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../service/category.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  @Output() categorySelected = new EventEmitter<string>();
  categories : any[] = []
  constructor(private categoryService:CategoryService,private router:Router){}
  ngOnInit(): void {
      this.categoryService.getCategories().subscribe(
        response => {this.categories = response},
        error => {console.error('error fetching categories',error);
        }
      );
  }
  onSearch(event:Event){
    const input = event.target as HTMLInputElement;
    this.search.emit(input.value.toLowerCase())
  }

  onCategoryClick(category:string){
    this.categorySelected.emit(category);
  }

}
