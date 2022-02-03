import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { AcceptComponent } from './accept/accept.component';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private snackbar: SnackbarService) {
    this.request = data;
  }

  request: any;

  ngOnInit(): void {
  }

  openAccept() {
    const dialogRef = this.dialog.open(AcceptComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.snackbar.open("Nice");
    });
  }
}
