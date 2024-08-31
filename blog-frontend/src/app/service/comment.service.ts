import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url = "http://localhost:8082/comments";
  constructor(private http : HttpClient) { }

  addComment(comment : any){
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.post<any>(comment,{ headers });
  }

  modifyComment(comment : any,id : number){
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const modificationUrl = `${this.url}/${id}`;
    return this.http.put<any>(modificationUrl,comment,{ headers });
  }

  deleteComment(id:number){
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<any>(deleteUrl,{ headers });
  }
}
