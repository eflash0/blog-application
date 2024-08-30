import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url = "http://localhost:8082/comments";
  constructor(private http : HttpClient) { }

  getCommentsByPost(idPost : number):Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.get<any>(this.url,{headers});
  }

  addComment(comment : any){
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.post<any>(comment,{ headers });
  }
}
