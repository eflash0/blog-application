import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AdminService } from '../../service/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { NavigationBarComponent } from "../../navigation-bar/navigation-bar.component";
import { FooterComponent } from "../../footer/footer.component";

@Component({
  selector: 'app-get-users',
  standalone: true,
  imports: [CommonModule, NavigationBarComponent, FooterComponent],
  templateUrl: './get-users.component.html',
  styleUrl: './get-users.component.css'
})
export class GetUsersComponent implements OnInit {
  users : any[] = [];
  filteredUsers : any[] = [];
  constructor(private adminService : AdminService,public dialog : MatDialog){

  }
  ngOnInit(): void {
      this.adminService.getUsers().subscribe(
        response => {
          this.users = response;
          this.filteredUsers = [...this.users];
        },
        error => {console.error('error fetching users',error);}
      );
  }

  
  openAddUserDialog() : void{
    const dialogRef = this.dialog.open(AddUserComponent , {width : '400px',height:'400px'});
    dialogRef.afterClosed().subscribe(
      response => {
        this.ngOnInit();
      }
    );

  }

  searchUsers(event : Event){
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredUsers = this.users.filter((user : any) =>{
      return (user.username.toLowerCase().includes(searchTerm));
    });
  }

  openUpdateUserDialog(user : any) : void{
    const dialogRef = this.dialog.open(UpdateUserComponent,{width:'400px',height:'400px',data:user});
    dialogRef.afterClosed().subscribe(
      response => {
        console.log('dialog was closed');
        this.ngOnInit();
      }
    );
  }

  deleteUser(id : number) : void{
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data : {title : 'Delete Confirmation',content : 'Are you sure you want to delete this user?'}
    });
    dialogRef.afterClosed().subscribe(
      result => 
        {
          if(result){
            this.adminService.deleteUser(id).subscribe(
              response => {
                console.log('deleted successfully',response);
                this.ngOnInit();
              } ,
              error => {error.log('error deleting user');}
            );
          }
        }
    );
  }
}
