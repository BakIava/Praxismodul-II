import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../services/api/api.service';

export interface Request {
  id: string;
  status: string;
  assigned_to: string;
  car: string;
  budget: number;
}

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements AfterViewInit  {
  displayedColumns: string[] = ['id', 'status', 'assigned_to', 'car', 'budget'];
  dataSource!: MatTableDataSource<Request>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private api: ApiService) {    
    this.api.getRequests({ 'Authorization': ''}).then(requests => {
      this.dataSource.data = requests;
    }).catch(error => {
      console.log(error);      
    });

    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    if(this.paginator != undefined && this.sort != undefined) {      
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
}