import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './signup/signup/signup.component';
import { GetPostsComponent } from './post/get-posts/get-posts.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { CreatePostComponent } from './post/create-post/create-post.component';

export const routes: Routes = [
    {path : 'login', component : LoginComponent},
    {path : 'signup', component : SignupComponent},
    {path : 'get-posts', component : GetPostsComponent},
    {path : 'navigation-bar', component : NavigationBarComponent},
    {path : 'post-details', component : PostDetailComponent},
    {path : 'create-post', component : CreatePostComponent}
];
