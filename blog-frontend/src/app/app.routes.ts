import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './signup/signup/signup.component';
import { GetPostsComponent } from './post/get-posts/get-posts.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { CommentSectionComponent } from './comment/comment-section/comment-section.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UpdatePostComponent } from './post/update-post/update-post.component';

export const routes: Routes = [
    {path : 'login', component : LoginComponent},
    {path : 'signup', component : SignupComponent},
    {path : 'get-posts', component : GetPostsComponent},
    {path : 'navigation-bar', component : NavigationBarComponent},
    {path : 'create-post', component : CreatePostComponent},
    {path : 'posts/:id', component : PostDetailComponent},
    {path : 'updatePost/:id', component : UpdatePostComponent},
    {path : 'users/:id', component : UserProfileComponent},
    {path : 'comment', component : CommentSectionComponent}
];
