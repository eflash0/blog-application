import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:8082/auth"
  constructor(private http : HttpClient) { }

  login(loginRequest : any) : Observable<any>{  
    const loginUrl = `${this.url}/login`;
    return this.http.post<any>(loginUrl,loginRequest);
  }

  signup(signupRequest : any) : Observable<any>{  
    const signupUrl = `${this.url}/signup`;
    return this.http.post<any>(signupUrl,signupRequest);
  }

  validateToken() : Observable<boolean>{
    const validateUrl = `${this.url}/validate-token`;
    const token = localStorage.getItem('token');
    return this.http.post<any>(validateUrl,token);
  }

  extractUsername() : string{
    const token = localStorage.getItem('token');
    if(token){
      const decodeToken : any = jwtDecode(token);
      return decodeToken.sub;
    }
    return '';
  }

  getRole() : string{
    const token = localStorage.getItem('token');
    if(token){
      const decodeToken : any = jwtDecode(token);
      return decodeToken.role;
    }
    return '';
  }

  isAdmin() : boolean{
    return (this.getRole() === 'ADMIN');
  }

  logout(){
    localStorage.removeItem('token');
  }

}
