import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ApiService } from '../services/api/api.service';
import { CreateUserComponent } from './create-user/create-user.component';

export interface User {
  id: number;
  displayName: string;
  username: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {
  
  constructor(private api: ApiService, public dialog: MatDialog) { 
  }


  USER_DATA: User[] = [
  ];

  displayedColumns: string[] = ['id', 'displayName', 'username', 'password', 'role'];
  dataSource = [...this.USER_DATA];

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    await this.api.getUsers({}).then(response => {  
      this.dataSource = response
    }).catch(error => {
      console.log(error);      
    });
  }

  createUser() {
    const dialogRef = this.dialog.open(CreateUserComponent, {      
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUsers();
    });

  }
}
