import { Component, Inject } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../model/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {

  user : any;
  password : String = '';
  constructor(private adminService : AdminService,public dialogRef : MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any){
      this.user = {...data}; //to create new object and not reference the same one
  }

  ngOnInit(): void {
      
  }

  onCancel() : void {
    this.dialogRef.close();
  }

  updateUser() : void{
    this.user.password = this.password;
    this.adminService.updateUser(this.user,this.user.userId).subscribe(
      response => {
        console.log('user updated successfully',response);
        this.dialogRef.close();
      },
      error => {console.log('error updating user',error);}

    )
  }

}
