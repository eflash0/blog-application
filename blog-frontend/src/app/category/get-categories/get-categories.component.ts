import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { NavigationBarComponent } from "../../navigation-bar/navigation-bar.component";
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-get-categories',
  standalone: true,
  imports: [CommonModule, NavigationBarComponent, FooterComponent],
  templateUrl: './get-categories.component.html',
  styleUrl: './get-categories.component.css'
})
export class GetCategoriesComponent implements OnInit {
  categories : any[] = [];
  filteredCategories : any[] = [];
  constructor(private categoryService : CategoryService,public dialog : MatDialog){ }
  ngOnInit(): void {
      this.categoryService.getCategories().subscribe(
        response => {this.categories = response;
          this.filteredCategories = [...this.categories];
        },
        error => {console.error('error fetching categories',error);}
      );
  }

  addCategory() : void{
    const dialogRef = this.dialog.open(AddCategoryComponent,{width:'400px',height:'230px',});
    dialogRef.afterClosed().subscribe(
      response => {
        this.ngOnInit();
      },
      error => {console.error('an error occurs',error);}
    );
  }

  updateCategory(category : any) : void{
    const dialogRef = this.dialog.open(UpdateCategoryComponent,{width:'400',height:'230px',data:category});
    dialogRef.afterClosed().subscribe(
      response => {
        this.ngOnInit();
      },
      error => {console.error('an error occurs',error);}
    )
  }

  deleteCategory(id : number) : void{
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data : {title : 'Category Deletion',content : 'Are you sure you wanna delete this category?'}
    });
    dialogRef.afterClosed().subscribe(
      response => {
        if(response){
          this.categoryService.deleteCategory(id).subscribe(
            response => {
              this.ngOnInit();
            },
            error => {console.error('error deleting category',error);
            }
          );
        }
      }
    );
  }

  searchCategories(event : Event) : void{
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredCategories = this.categories.filter((category : any) => {
      return (category.name.toLowerCase().includes(searchTerm));
    });
  }
}
