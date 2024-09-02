import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "http://localhost:8082/users"
  constructor(private http : HttpClient) { }

  findUserById(id : number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const user = `${this.url}/1`;
    return this.http.get<any>(user,{ headers });
  }

  findUserByUsername(username : string) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const user = `${this.url}/username/${username}`;
    return this.http.get<any>(user,{ headers });
  }

  getUserPosts(id : number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const postsUrl = `${this.url}/${id}/posts`;
    return this.http.get<any>(postsUrl,{ headers });
  }
}

