import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { SnackbarLevel, SnackbarService } from '../services/snackbar/snackbar.service';
import { Request } from '../Model/Request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {

  constructor(private api: ApiService, private snackbar: SnackbarService, private router: Router) { }

  ngOnInit() {
    this.checkRequests();
    }

    requestId: any = null;

    async checkRequests() {
      var token = localStorage.getItem('AccessToken');
      await this.api.getRequest({Authorization: token }).then(response => {
        if(response) {
          this.requestId = response.id;
          // this.snackbar.open("User has already Request", this.snackbar.)
        }
      }).catch(error => {

      })
    }

  carStates = [
    { id: 0, displayName: 'Neuwagen' },
    { id: 1, displayName: 'Gebrauchtwagen' },
  ]

  fuels = [
    { id: 0, displayName: 'Benzin' },
    { id: 1, displayName: 'Diesel' },
    { id: 2, displayName: 'Elektro' },
    { id: 3, displayName: 'Hybrid' },
    { id: 4, displayName: 'Wasserstoff' },
  ]

  request = new Request();

  async createRequest() {
    if(this.file == null) {
      this.snackbar.open("Angebot anhängen", SnackbarLevel.INFO)
      return;
    }

    var user = JSON.parse(localStorage.getItem("AccessToken") || "{}");
    
    this.request.employee = user.displayName;

    await this.api.createRequest(this.request, { }).then(async response => {
      this.request.id = response;
      const formData = new FormData();  
      formData.append("offer", this.file);
      formData.append("id", this.request.id);
      await this.api.uploadOffer(formData, {});

      this.snackbar.open("Anfrage wurde unter folgender ID erstellt: " + this.request.id, SnackbarLevel.SUCCESS)
      
      this.requestId = this.request.id;
    }).catch(error => {
      console.log(error);
    });
  }

  file: any = null;
  fileName = '';

  onFileSelected(event: any) {

    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      this.file = file;
      console.log(file);

      // const formData = new FormData();

      // formData.append("thumbnail", file);

      // const upload$ = this.http.post("/api/thumbnail-upload", formData);

      // upload$.subscribe();
    }
  }

  goToMyRequest() {    
    this.router.navigate(['/my-request']);
  }
}
