import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../service/admin.service';
import { User } from '../../model/user';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent {
  admin : User = new User('');
  constructor(private adminService : AdminService,public dialogRef :MatDialogRef<AddAdminComponent>){}

  addAdmin() : void{
    this.adminService.addAdmin(this.admin).subscribe(
      response => { console.log('admin added successfully',response);
        this.dialogRef.close();
      },
      error => {console.error("error adding admin",error);}
    );
  }
  onCancel() : void{
    this.dialogRef.close();
  }
}
