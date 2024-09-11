import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FooterComponent, NavigationBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private router:Router){}
  
  navigateToCategories() {
    this.router.navigate(['/categories']);
  }
  navigateToUsers() {
    this.router.navigate(['/users']);
  
  }
  navigateToAdmins() {
    this.router.navigate(['/admins']);
  }

}
