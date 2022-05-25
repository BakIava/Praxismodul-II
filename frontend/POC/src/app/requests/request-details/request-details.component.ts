import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { AcceptComponent } from './accept/accept.component';
import { SnackbarLevel } from 'src/app/services/snackbar/snackbar.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private snackbar: SnackbarService, private api: ApiService) {
    this.request = data;
  }

  request: any;

  ngOnInit(): void {
  }

  openAccept() {
    const dialogRef = this.dialog.open(AcceptComponent);
    dialogRef.afterClosed().subscribe(async result => {
      this.request.status = result.status;
      this.request.managerMsgs.push(result.message);

      if(result.accepted) {
        this.snackbar.open("Sie haben die Anfrage genehmigt", SnackbarLevel.SUCCESS);
      } else {
        this.snackbar.open("Sie haben die Anfrage abgelehnt", SnackbarLevel.WARN);
      }

      await this.api.updateRequest({id: this.request.id, status: this.request.status, managerMsgs: this.request.managerMsgs }, {});
    });
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
}
