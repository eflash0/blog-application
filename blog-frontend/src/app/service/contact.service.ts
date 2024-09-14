import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private url = 'http://localhost:8082/contact'
  constructor(private http : HttpClient) { }

  sendMail(contact : any) : Observable<any>{
    const sendUrl = `${this.url}/send-mail`;
    const headers = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')}`);
    return this.http.post<any>(sendUrl,contact,{ headers });
  }
}
