import { Component, OnInit , ViewChild } from '@angular/core';


import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  _id : number,
  DeploymentName: string;
  FirstName: string;
  LastName: string;
  Email:string;
  PhoneNumber:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {_id:1,DeploymentName: 'Dove Creek CO', FirstName: 'John',LastName: 'Mac',Email:'johnmac@gmail.com',PhoneNumber:'+07 7090 900709'},
  {_id:2,DeploymentName: 'DTPHX Test Deployment', FirstName: 'Rusi',LastName: 'Hart',Email:'rusihart@gmail.com',PhoneNumber:'+07 7080 900843'},
  {_id:3,DeploymentName: 'Indian Wells Valley', FirstName: 'Cristal',LastName: 'Roz',Email:'cristalroz@gmail.com',PhoneNumber:'+44 7700 900843'},
  {_id:4,DeploymentName: 'Jons Test Deployment', FirstName: 'Lucci',LastName: 'Hart',Email:'luccihart@gmail.com',PhoneNumber:'+07 7050 900383'}
];

@Component({
  selector: 'app-enforcements',
  templateUrl: './enforcements.component.html',
  styleUrls: ['./enforcements.component.css']
})
export class EnforcementsComponent implements OnInit {

 displayedColumns: string[] = ['DeploymentName', 'FirstName', 'LastName','Email','PhoneNumber','Action'];
  
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
