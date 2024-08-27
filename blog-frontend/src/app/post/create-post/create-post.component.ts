import { Component } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { NavigationBarComponent } from "../../navigation-bar/navigation-bar.component";

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FooterComponent, NavigationBarComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {

}
