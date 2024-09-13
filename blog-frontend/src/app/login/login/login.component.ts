import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
    loginRequest = {
      username : '',
      password : ''
    };
    rememberMe : boolean = false;
    constructor(private authService : AuthService,private router : Router){}

    ngOnInit(): void {
        this.authService.validateToken().subscribe(
          isValid => {
            if(isValid){
              this.router.navigate(['/home']);
            }
          },
          error => {this.router.navigate(['/login']);}
        );
    }

    login() : void{
      this.authService.login(this.loginRequest).subscribe(
        response => {
          localStorage.setItem('token',response.token);
          this.router.navigate(['/home']);
        },
        error => {console.error('login failed',error);}
      );
    }

    goSignup() : void{
      this.router.navigate(['/signup']);
    }
}
