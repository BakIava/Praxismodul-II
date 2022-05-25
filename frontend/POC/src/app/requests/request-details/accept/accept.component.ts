import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-accept',
  templateUrl: './accept.component.html',
  styleUrls: ['./accept.component.scss']
})
export class AcceptComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AcceptComponent> ) { }

  ngOnInit(): void {
  }

  message: string = '';

  accept() {
    this.dialogRef.close({accepted: true, status: 'accepted', message: this.message});
  }

  decline() {
    this.dialogRef.close({accepted: false,status: 'declined', message: this.message});
  }  
}
