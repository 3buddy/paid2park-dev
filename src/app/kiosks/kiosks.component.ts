import { Component, OnInit , ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  _id : number;
  DeploymentName: string;
  KiosksNumber: string;
  Location: string;
  MacAddress:string;
  Guid:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {_id:1,DeploymentName: 'Dove Creek CO', KiosksNumber: '12345', Location: 'E Washiongton St',MacAddress:'Lorem ipsum dolar',Guid:'43257'},
  {_id:2,DeploymentName: 'DTPHX Test Deployment', KiosksNumber: '12345', Location: '996 Addison Dr.Coram, NY 11727',MacAddress:'Lorem ipsum dolar',Guid:'43257'},
  {_id:3,DeploymentName: 'Indian Wells Valley', KiosksNumber: '12345', Location: '651 Pacific St. Coram, CA 91762',MacAddress:'Lorem ipsum dolar',Guid:'43257'},
  {_id:4,DeploymentName: 'Jons Test Deployment', KiosksNumber: '12345', Location: '9076 Redwood St. Findlay, OH 45840',MacAddress:'Lorem ipsum dolar',Guid:'43257'}
];


@Component({
  selector: 'app-kiosks',
  templateUrl: './kiosks.component.html',
  styleUrls: ['./kiosks.component.css']
})
export class KiosksComponent implements OnInit {

  displayedColumns: string[] = ['DeploymentName', 'KiosksNumber', 'Location','MacAddress','Guid','Action'];
  
  dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit() {
  
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
	
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
