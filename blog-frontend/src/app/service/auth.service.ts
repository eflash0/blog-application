import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url : String = "http://localhost:8082/auth"
  constructor(private http : HttpClient) { }

  login(loginRequest : any) : Observable<any>{  
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const loginUrl = `${this.url}/login`;
    return this.http.post<any>(loginUrl,loginRequest,{ headers });
  }

  signup(signupRequest : any) : Observable<any>{  
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const signupUrl = `${this.url}/signup`;
    return this.http.post<any>(signupUrl,signupRequest,{ headers });
  }
}
