import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  createRequest(body: any, headers: any) {    
    return this.http.post<any>(baseUrl + '/requests', body, { headers: headers }).toPromise();
  }

  uploadOffer(body: any, headers: any) {    
    return this.http.post<any>(baseUrl + '/offer', body, { headers: headers }).toPromise();
  }

  getRequests(headers: any) {
    return this.http.get<any>(baseUrl + '/requests', { headers: headers }).toPromise();
  }

  getRequest(headers: any) {
    return this.http.get<any>(baseUrl + '/request', { headers: headers }).toPromise();
  }
}