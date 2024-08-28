import { Component } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { NavigationBarComponent } from "../../navigation-bar/navigation-bar.component";
import { Post } from '../../model/post';
import { PostService } from '../../service/post.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FooterComponent, NavigationBarComponent , FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  post = new Post('','',0);
  constructor(private postService : PostService) {}

  create() : void{
    this.post.authorId = Number(localStorage.getItem('userId'));
    this.postService.addPost(this.post).subscribe(
      response => {
        console.log('post added with success',response);
      },
      error => {console.error('error adding post',error);}
    );
  }
}
