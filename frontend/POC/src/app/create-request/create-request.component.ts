import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  approvers = [
    { id: 0, displayName: 'Tanja Nagel' },
    { id: 1, displayName: 'Sebastian Bumgarner' },
    { id: 2, displayName: 'Daniela Dresdner' },
    { id: 3, displayName: 'Torsten Zimmermann' }
  ]

  carmodels = [
    { model: 'audi_t1', displayName: 'Audi Super V2 T1' },
    { model: 'audi_t2', displayName: 'Audi Turbo V3 T2' }
  ]

  request = {
    id: '00-59523-1',
    budget: 100000,
    user: 'Benjamin Krause',
    approver: -1,
    status: 'New',
    carmodel: '',
    approvalStatus: 'Anfrage wurde nicht erstellt',
    description: '',
    date: new Date()
  }

  async createRequest() {
    await this.api.createRequest(this.request, {}).then(response => {
      console.log(response);      
    }).catch(error => {
      console.log(error);
    });
  }
}
