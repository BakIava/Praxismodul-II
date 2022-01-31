import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  createRequest(body: any, headers: any) {
    console.log(body);
    
    return this.http.post<any>(baseUrl + '/requests', body, { headers: headers }).toPromise();
  }

  getRequests(headers: any) {
    return this.http.get<any>(baseUrl + '/requests', { headers: headers }).toPromise();
  }
}