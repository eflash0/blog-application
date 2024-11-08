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
import { GetCategoriesComponent } from './category/get-categories/get-categories.component';
import { GetUsersComponent } from './user/get-users/get-users.component';
import { GetAdminsComponent } from './admin/get-admins/get-admins.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { adminGuard } from './guard/admin.guard';
import { authGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {path : 'login', component : LoginComponent},
    {path : 'signup', component : SignupComponent},
    {path : 'get-posts', component : GetPostsComponent,canActivate:[authGuard]},
    {path : 'navigation-bar', component : NavigationBarComponent,canActivate:[authGuard]},
    {path : 'create-post', component : CreatePostComponent,canActivate:[authGuard]},
    {path : 'posts/:id', component : PostDetailComponent,canActivate:[authGuard]},
    {path : 'updatePost/:id', component : UpdatePostComponent,canActivate:[authGuard]},
    {path : 'users/:id', component : UserProfileComponent,canActivate:[authGuard]},
    {path : 'users/:id', component : UserProfileComponent,canActivate:[authGuard]},
    {path : 'categories', component : GetCategoriesComponent,canActivate:[authGuard,adminGuard]},
    {path : 'users', component : GetUsersComponent,canActivate:[authGuard,adminGuard]},
    {path : 'admins', component : GetAdminsComponent,canActivate:[authGuard,adminGuard]},
    {path : 'dashboard', component : DashboardComponent,canActivate:[authGuard,adminGuard]},
    {path : 'comment', component : CommentSectionComponent},
    {path : 'about', component : AboutComponent},
    {path : 'contact', component : ContactComponent},
    {path : 'home', component : HomeComponent},
    {path: '**', component: NotFoundComponent}

];
