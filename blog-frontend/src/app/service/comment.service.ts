import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url = "http://localhost:8082/comments";
  constructor(private http : HttpClient) { }

  addComment(comment : any) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.post<any>(this.url,comment,{ headers });
  }

  modifyComment(comment : any,id : number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const modificationUrl = `${this.url}/${id}`;
    return this.http.put<any>(modificationUrl,comment,{ headers });
  }

  deleteComment(id:number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<any>(deleteUrl,{ headers });
  }

  getCommentReplies(id : number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const repliesUrl = `${this.url}/${id}/replies`;
    return this.http.get<any>(repliesUrl,{ headers });
  }

  addReply(reply:any,id : number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const replyUrl = `${this.url}/${id}/reply`;
    return this.http.post<any>(replyUrl,reply,{ headers });
  }
}
