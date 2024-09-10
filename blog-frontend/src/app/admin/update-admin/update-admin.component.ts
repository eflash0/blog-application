import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../service/admin.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-admin.component.html',
  styleUrl: './update-admin.component.css'
})
export class UpdateAdminComponent {
  admin : any;
  password : String = '';
  constructor(private adminService : AdminService,public dialogRef : MatDialogRef<UpdateAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any){
      this.admin = {...data}; 
  }

  ngOnInit(): void {
      
  }

  onCancel() : void {
    this.dialogRef.close();
  }

  updateAdmin() : void{
    this.admin.password = this.password;
    this.adminService.updateUser(this.admin,this.admin.userId).subscribe(
      response => {
        console.log('admin updated successfully',response);
        this.dialogRef.close();
      },
      error => {console.log('error updating admin',error);}
    );
  }
}
