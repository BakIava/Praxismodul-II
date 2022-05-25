import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/user-roles/user-roles.component';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  authenticate(headers: any) {
    return this.http.post<any>(baseUrl + '/auth', {}, { headers: headers }).toPromise();
  }

  getUsers(headers: any) {
    return this.http.get<User[]>(baseUrl + '/users', { headers: headers }).toPromise();
  }

  createUser(body: any, headers: any) {
    return this.http.post<any>(baseUrl + '/users', body, { headers: headers }).toPromise();
  }

  createRequest(body: any, headers: any) {
    return this.http.post<any>(baseUrl + '/request', body, { headers: headers }).toPromise();
  }

  uploadOffer(body: any, headers: any) {
    return this.http.post<any>(baseUrl + '/offer', body, { headers: headers }).toPromise();
  }

  getRequests(headers: any) {
    return this.http.get<any>(baseUrl + '/requests', { headers: headers }).toPromise();
  }

  updateRequest(body: any, headers: any) {
    return this.http.post<any>(baseUrl + '/request/update', body, { headers: headers }).toPromise();
  }

  getRequest(headers: any) {
    return this.http.get<any>(baseUrl + '/request', { headers: headers }).toPromise();
  }
}