import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent implements OnInit {
  username : string = '';
  menuOpen = false;
  user : any;
  isAdmin = false;

  constructor(private userService : UserService,private authService : AuthService,private router : Router){}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.username = this.authService.extractUsername();
    this.userService.findUserByUsername(this.username).subscribe(
      response => {this.user = response;},
      error => {console.error('error fetching user',error);}
    );
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  profile(){
    this.router.navigate(['/users',this.user.userId])
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
