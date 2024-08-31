import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { SideBarComponent } from "../../side-bar/side-bar.component";
import { NavigationBarComponent } from "../../navigation-bar/navigation-bar.component";
import { FooterComponent } from "../../footer/footer.component";
import { PostService } from '../../service/post.service';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { TruncatePipe } from "./truncate.pipe";
@Component({
  selector: 'app-get-posts',
  standalone: true,
  imports: [DatePipe, CommonModule, SideBarComponent, NavigationBarComponent, FooterComponent, TruncatePipe],
  templateUrl: './get-posts.component.html',
  styleUrl: './get-posts.component.css'
})
export class GetPostsComponent implements OnInit {
  posts : any[] = [];
  paginatedPosts : any[] = [];
  filteredPosts : any[] = [];
  postsNumbers : number = 0;
  postsPerPage : number = 6;
  currentPage : number = 1;
Math: any;
  constructor(private postService : PostService,private userService : UserService,private router:Router) {}
  
  ngOnInit(): void {
      this.postService.getPosts().subscribe(
        response => {this.posts = response.map((post:any) => ({
            ...post,
            createdAt: new Date(
              post.createdAt[0],  
              post.createdAt[1] - 1,  
              post.createdAt[2], 
              post.createdAt[3],  
              post.createdAt[4],
              post.createdAt[5],
              post.createdAt[6] / 1000000
            )
          }));
          this.filteredPosts = [...this.posts];
          this.updatePaginatedPosts();
        },
        error => {console.error('error fetching posts',error);}
      );
  }

  updatePaginatedPosts():void{
    const startIndex = (this.currentPage-1)*this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    console.log(this.posts.length);
    this.paginatedPosts = this.filteredPosts.slice(startIndex,endIndex);
  }

  changePage(page : number):void{
    this.currentPage = page;
    this.updatePaginatedPosts();
  }

  nextPage():void{
    if((this.posts.length/6)>this.currentPage){
      this.currentPage++;
      this.updatePaginatedPosts();
    }   
  }

  previousPage():void{
    if(this.currentPage>1){
      this.currentPage--;
      this.updatePaginatedPosts();
    }
  }

  getTotalPages(): number[] {
    const totalPages = Math.ceil(this.posts.length / this.postsPerPage);
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  postDetails(id:number) : void{
    this.router.navigate(['/posts',id]);
  }

  onSearch(searchTerm: string): void {
    console.log(searchTerm);
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    this.filteredPosts = this.posts.filter(post =>
      post.title.toLowerCase().includes(lowerSearchTerm) ||
      post.content.toLowerCase().includes(lowerSearchTerm)
    );
    this.currentPage = 1;
    this.updatePaginatedPosts();
  }

  onCategoryClick(category: string) {
    this.postService.getPostsByCategory(category).subscribe(
      response => {
        this.filteredPosts = response.map((post:any) =>({
          ...post,
          createdAt : new Date(
            post.createdAt[0],
            post.createdAt[1]-1,
            post.createdAt[2],
            post.createdAt[3],
            post.createdAt[4],
            post.createdAt[5],
            post.createdAt[6]/1000000
          )
        }));
        this.updatePaginatedPosts();
      },
      error => {console.error('error fetching posts by category',error);}
    );
  }

}
