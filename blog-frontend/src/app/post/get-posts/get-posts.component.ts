import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from "../../side-bar/side-bar.component";
import { NavigationBarComponent } from "../../navigation-bar/navigation-bar.component";
import { FooterComponent } from "../../footer/footer.component";
@Component({
  selector: 'app-get-posts',
  standalone: true,
  imports: [DatePipe, CommonModule, SideBarComponent, NavigationBarComponent, FooterComponent],
  templateUrl: './get-posts.component.html',
  styleUrl: './get-posts.component.css'
})
export class GetPostsComponent {

}
