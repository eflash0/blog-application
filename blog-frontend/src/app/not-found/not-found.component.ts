import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [FooterComponent, NavigationBarComponent, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
