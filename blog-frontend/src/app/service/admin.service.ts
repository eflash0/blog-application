import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url : string = 'http://localhost:8082/admins';

  constructor(private http : HttpClient) { }

  getUsers() : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const users = `${this.url}/getUsers`;
    return this.http.get<any>(users);
  }

  getAmins() : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const admins = `${this.url}/getAdmins`;
    return this.http.get<any>(admins);
  }

  addAdmin(admin : any) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const addAdmin = `${this.url}/addAdmin`;
    return this.http.post<any>(addAdmin,admin,{ headers });
  }

  addUser(user : any) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const addUser = `${this.url}/addUser`;
    return this.http.post<any>(addUser,user,{ headers });
  }

  updateUser(user : any,id : number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const updateUrl = `${this.url}/${id}`;
    return this.http.put<any>(updateUrl,user,{ headers })
  }

  deleteUser(id : number) : Observable<any>{
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<any>(deleteUrl,{ headers });
  }

}
