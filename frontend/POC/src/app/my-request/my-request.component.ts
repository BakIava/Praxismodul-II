import { Component, OnInit } from '@angular/core';
import { Request } from '../Model/Request';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-my-request',
  templateUrl: './my-request.component.html',
  styleUrls: ['./my-request.component.scss']
})
export class MyRequestComponent implements OnInit {

  constructor(private api: ApiService) { }

  request: Request | null = null;
  fileName = ''

  ngOnInit(): void {
    this.getRequest();  
  }

  async getRequest(): Promise<void> {
    var token = localStorage.getItem('AccessToken');
    await this.api.getRequest({ Authorization: token }).then(response => {
      this.request = response;
      console.log(response);      
    }).catch(error => {
      console.log(error);      
    })
  }

  openMessages() {

  }

}
