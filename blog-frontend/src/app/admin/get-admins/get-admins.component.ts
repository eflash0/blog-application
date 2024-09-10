import { Component } from '@angular/core';
import { NavigationBarComponent } from "../../navigation-bar/navigation-bar.component";
import { AdminService } from '../../service/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { AddAdminComponent } from '../add-admin/add-admin.component';
import { UpdateAdminComponent } from '../update-admin/update-admin.component';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';
import { FooterComponent } from "../../footer/footer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-admins',
  standalone: true,
  imports: [NavigationBarComponent, FooterComponent, CommonModule],
  templateUrl: './get-admins.component.html',
  styleUrl: './get-admins.component.css'
})
export class GetAdminsComponent {
  admins : any[] = [];
  filteredAdmins : any[] = [];
  constructor(private adminService : AdminService,public dialog : MatDialog){

  }
  ngOnInit(): void {
      this.adminService.getAmins().subscribe(
        response => {
          this.admins = response;
          this.filteredAdmins = [...this.admins];
        },
        error => {console.error('error fetching admins',error);}
      );
  }

  
  openAddAdminDialog() : void{
    const dialogRef = this.dialog.open(AddAdminComponent , {width : '400px',height:'400px'});
    dialogRef.afterClosed().subscribe(
      response => {
        this.ngOnInit();
      }
    );

  }

  searchAdmins(event : Event){
    const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredAdmins = this.admins.filter((admin : any) =>{
      return (admin.username.toLowerCase().includes(searchTerm) ||
      admin.email.toLowerCase().includes(searchTerm)
    );
    });
  }

  openUpdateAdminDialog(admin : any) : void{
    const dialogRef = this.dialog.open(UpdateAdminComponent,{width:'400px',height:'400px',data:admin});
    dialogRef.afterClosed().subscribe(
      response => {
        console.log('dialog was closed');
        this.ngOnInit();
      }
    );
  }

  deleteAdmin(id : number) : void{
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data : {title : 'Delete Confirmation',content : 'Are you sure you want to delete this admin?'}
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
              error => {error.log('error deleting admin',error);}
            );
          }
        }
    );
  }
}
