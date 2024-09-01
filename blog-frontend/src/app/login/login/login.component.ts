import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    loginRequest = {
      username : '',
      password : ''
    };
    rememberMe : boolean = false;
    constructor(private authService : AuthService,private router : Router){}

    login() : void{
      this.authService.login(this.loginRequest).subscribe(
        response => {
          console.log('login with success');
          localStorage.setItem('token',response.token);
        },
        error => {console.error('login failed',error);}
      );
    }

    goSignup() : void{
      this.router.navigate(['/signup']);
    }
}
