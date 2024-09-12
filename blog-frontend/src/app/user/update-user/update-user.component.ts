import { Component, Inject } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../model/user';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {
  isAdmin = false;
  user : any;
  password : String = '';
  constructor(private adminService : AdminService,public dialogRef : MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any, private authService : AuthService){
      this.user = {...data}; //to create new object and not reference the same one
  }

  ngOnInit(): void {
      this.isAdmin = this.authService.isAdmin();
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
