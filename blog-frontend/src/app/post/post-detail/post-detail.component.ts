import { Component } from '@angular/core';
import { NavigationBarComponent } from "../../navigation-bar/navigation-bar.component";

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [NavigationBarComponent],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent {

}
