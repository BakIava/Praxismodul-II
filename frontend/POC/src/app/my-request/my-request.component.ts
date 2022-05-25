import { Component, OnInit } from '@angular/core';
import { Request } from '../Model/Request';
import { ApiService } from '../services/api/api.service';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-request',
  templateUrl: './my-request.component.html',
  styleUrls: ['./my-request.component.scss']
})
export class MyRequestComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }

  request: Request | null = null;
  fileName = ''
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'buffer';
  value = 20;
  bufferValue = 40;
  status = 'pending';

  ngOnInit(): void {
    this.getRequest();  
  }

  async getRequest(): Promise<void> {
    var token = localStorage.getItem('AccessToken');
    await this.api.getRequest({ Authorization: token }).then(response => {
      console.log(response);
      
      this.request = response;

      if(this.request?.status == 'accepted') {
        this.value = 40;
        this.bufferValue = 60;
        this.status = 'done'
      }

      console.log(response);      
    }).catch(error => {
      console.log(error);      
    })
  }

  openFile(file: any) {
    let blob:any = new Blob([this._base64ToArrayBuffer(file.data)], { type: 'application/doc' });
    const url = window.URL.createObjectURL(blob);
    // console.log(new File(file.data, file.name));
    var a = document.createElement("a");
    a.href = url;
    a.target = '_blank';
    // Don't set download attribute
    a.download = file.name;
    a.click();
  }

  _base64ToArrayBuffer(base64:any) {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }

  openMessages() {

  }

  goToCreateRequest() {    
    this.router.navigate(['/create-request']);
  }

}
