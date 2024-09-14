import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";
import { FormsModule } from '@angular/forms';
import { ContactService } from '../service/contact.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FooterComponent, NavigationBarComponent, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactRequest = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  constructor(private contactService  : ContactService, private snackBar : MatSnackBar){}


  sendMail(){
    this.contactService.sendMail(this.contactRequest).subscribe(
      response => {
        this.contactRequest = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
        this.snackBar.open('the mail is sent successfully' , 'Close' ,{
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['success-snackbar']
        });
      },
      error => {console.error('error sending mail',error);}
    );
  }
}

