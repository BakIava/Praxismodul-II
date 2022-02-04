import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api/api.service';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import {MatDialog} from '@angular/material/dialog';
import { RequestDetailsComponent } from './request-details/request-details.component';

export interface Request {
  id: string;
  employee: string;
  manufacturer: string;
  carmodel: string;
  grossPrice: number;
  budget: number;
  date: Date;
  fuelCard: boolean;
  carState: string;
}

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements AfterViewInit {
  columKeys: string[] = [
    'id',
    'employee',
    'manufacturer',
    'carmodel',
    'grossPrice',
    'budget',
    'date',
    'fuelCard',
    'carState',
  ];

  columDisplays: { [key: string]: string } = {
    'id': 'Anfrage-ID',
    'employee': 'Mitarbeiter',
    'manufacturer': 'Hersteller',
    'carmodel': 'Modell',
    'grossPrice': 'Bruttolistenpreis',
    'budget': 'Budget',
    'date': 'Anschaffungsdatum',
    'fuelCard': 'Tankkarte',
    'carState': 'Neuwagen?'
  }

  dataSource!: MatTableDataSource<Request>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private api: ApiService, private snachbar: SnackbarService, public dialog: MatDialog) {
    this.api.getRequests({ 'Authorization': '' }).then(requests => {
      this.dataSource.data = requests;
    }).catch(error => {
      console.log(error);
    });

    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    if (this.paginator != undefined && this.sort != undefined) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openRequest(request: any) {
    const dialogRef = this.dialog.open(RequestDetailsComponent, {
      data: request
    });
    dialogRef.afterClosed().subscribe(result => {
      this.snachbar.open("Nice");
    });
  }
}