import { Component, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {
  title : String = "";
  content : String = "";
  constructor(public dialogRef : MatDialogRef<ConfirmationDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data : {title : String,content : String}){ }

  cancel() : void {
    this.dialogRef.close(false);
  }  

  confirm() : void{
    this.dialogRef.close(true);
  }
}
