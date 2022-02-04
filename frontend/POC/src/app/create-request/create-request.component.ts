import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';

export class Request {
  constructor(
    public id: string = '',
    public budget: number = 110000,
    public manufacturer: string = '',
    public fuel: number = 0,
    public cubicCapacity: number = 0,
    public carmodel: string = '',
    public carState: number = 0,
    public message: string = '',
    public date: Date = new Date(),
    public fuelCard: boolean = false,
    public grossPrice: number = 100,
    public employee: string = 'Mustermann') { }
}


@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {

  constructor(private api: ApiService, private snackbar: SnackbarService) { }

  ngOnInit() {
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
      this.snackbar.open("Angebot anhängen")
      return;
    }

    await this.api.createRequest(this.request, { }).then(async response => {
      this.request.id = response;
      const formData = new FormData();  
      formData.append("offer", this.file);
      formData.append("id", this.request.id);
      await this.api.uploadOffer(formData, {});

      this.snackbar.open("Anfrage wurde unter folgender ID erstellt: " + this.request.id, "Verstanden", 10000)
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

  test() {
    this.snackbar.open("Test")
  }
}
