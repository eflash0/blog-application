import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FooterComponent, NavigationBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  
navigateToTags() {
throw new Error('Method not implemented.');
}
navigateToUsers() {
throw new Error('Method not implemented.');
}
navigateToAdmins() {
throw new Error('Method not implemented.');
}

}
