import { Component } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../model/category';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {
  category : Category = new Category();
  constructor(private categoryService : CategoryService,public dialogRef : MatDialogRef<AddCategoryComponent>){}

  addCategory(){
    this.categoryService.addCategory(this.category).subscribe(
      response => {this.dialogRef.close()},
      error => {console.error('error adding category',error);
      }
    );
  }

  onCancel() : void{
    this.dialogRef.close();
  }
}
