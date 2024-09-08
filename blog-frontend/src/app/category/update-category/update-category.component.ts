import { Component, Inject } from '@angular/core';
import { CategoryService } from '../../service/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent {
  category : any;
  constructor(private categoryService : CategoryService,public dialogRef : MatDialogRef<UpdateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) data : any
  ){
    this.category = {...data};
  }

  updateCategory() : void{
    this.categoryService.updateCategory(this.category,this.category.categoryId).subscribe(
      response => {
        this.dialogRef.close();
      },
      error => {console.error('error updating category',error);
      }
    );
  }

  onCancel() : void{
    this.dialogRef.close();
  }
}
