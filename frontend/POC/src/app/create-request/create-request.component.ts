import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
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

  request = {
    id: '00-59523-1',
    budget: 100000 ,
    manufacturer: '',
    fuel: 0,
    cubicCapacity: '',
    carmodel: '',
    carState: 0,
    message: '',
    date: new Date(),
    fuelCard: true,
    grossPrice: 100,
    employee: 'Mustermann'
  }

  async createRequest() {
    await this.api.createRequest(this.request, {}).then(response => {
      console.log(response);      
      this.snackbar.open("Anfrage wurde erstellt")
    }).catch(error => {
      console.log(error);
    });
  }
}
