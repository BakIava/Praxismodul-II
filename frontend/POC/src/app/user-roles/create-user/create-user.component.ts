import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api/api.service';
import { SnackbarLevel, SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  constructor(private api: ApiService, private snackbar: SnackbarService, public dialogRef: MatDialogRef<CreateUserComponent>) { }

  userroles = [
    'admin',
    'manager',
    'user'
  ]


  displayName: string = '';
  username: string = '';
  password: string = '';
  selectedRole: string = '';


  ngOnInit(): void {
  }

  async createUser() {
    await this.api.createUser({ displayName: this.displayName, username: this.username, password: this.password, role: this.selectedRole }, {}).then(response => {
      this.snackbar.open("Benutzer wurde erstellt", SnackbarLevel.SUCCESS)
    }).catch(error => {
      this.snackbar.open("Benutzer konnte nicht erstellt werden", SnackbarLevel.ERROR)
      console.log(error);
    })
    this.dialogRef.close();
  }
}
