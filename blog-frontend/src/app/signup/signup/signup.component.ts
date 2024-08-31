import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavigationBarComponent } from "../../navigation-bar/navigation-bar.component";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, NavigationBarComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupRequest = {
    username : '',
    email : '',
    password : '',
    confirmPassword : ''
  };
  constructor(private authService : AuthService,private router:Router) {}

  signup() : void{
    this.authService.signup(this.signupRequest).subscribe(
      response => {console.log('singup with sucess');
        this.router.navigate(['/login']);
      },
      error => {console.error('signup failed',error);}
    );
  }
}
