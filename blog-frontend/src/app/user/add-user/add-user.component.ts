import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../model/user';
import { AdminService } from '../../service/admin.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  user : User = new User('');
  constructor(private adminService : AdminService,public dialogRef :MatDialogRef<AddUserComponent>){}

  addUser() : void{
    this.adminService.addUser(this.user).subscribe(
      response => { console.log('user added successfully',response);
        this.dialogRef.close();
      },
      error => {console.error("error adding user",error);}
    );
  }
  onCancel() : void{
    this.dialogRef.close();
  }
}
