import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = "http://localhost:8082/posts";
  constructor(private http : HttpClient) { }

  getPosts() : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<any>(this.url,{ headers });
  } 

  getPostById(id : number) : Observable<any>{
    const postUrl = `${this.url}/${id}`;
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<any>(postUrl,{ headers });
  }

  addPost(post : any,file : File | null) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const formData: FormData = new FormData();
    formData.append('post', new Blob([JSON.stringify(post)], {type: 'application/json'}));
    
    if (file) {
      formData.append('file', file);
    }
    return this.http.post<any>(this.url,formData,{ headers })
  }

  updatePost(post : any,id : number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const updateUrl = `${this.url}/${id}`;
    return this.http.put<any>(updateUrl,post,{ headers });
  }

  deletePost(id : number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<any>(deleteUrl,{ headers });
  }

  getPostComments(id : number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const commentsUrl = `${this.url}/${id}/comments`;
    return this.http.get<any>(commentsUrl,{ headers });
  }

  getPostsByCategory(category : string) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    // const params = new HttpParams().set('category' , category);
    const byCategoryUrl = `${this.url}/byCategory?category=${category}`;
    return this.http.get<any>(byCategoryUrl,{ /*params ,*/ headers });
  }
}
