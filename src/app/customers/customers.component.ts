import { Component, OnInit , ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  _id:number;
  DeploymentName: string;
  FirstName: string;
  LastName: string;
  Email: string;
  IsActive:string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {_id:1,DeploymentName: 'Dove Creek CO', FirstName: 'John', LastName: 'Mac',Email:'johnmac@gmail.com',IsActive:'Yes'},
  {_id:2,DeploymentName: 'DTPHX Test Deployment', FirstName: 'Rusi', LastName: 'Hart',Email:'rusihart@gmail.com',IsActive:'Yes'},
  {_id:3,DeploymentName: 'Indian Wells Valley', FirstName: 'Cristal', LastName: 'Roz',Email:'cristalroz@gmail.com',IsActive:'Yes'},
  {_id:4,DeploymentName: 'Jons Test Deployment', FirstName: 'Lucci', LastName: 'Hart',Email:'luccihart@gmail.com',IsActive:'Yes'},
  {_id:5,DeploymentName: 'Jons New Test Deployment', FirstName: 'Lucciy', LastName: 'Hart',Email:'pb@c.com',IsActive:'No'}
];


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {


  displayedColumns: string[] = ['DeploymentName', 'FirstName', 'LastName','Email','IsActive','Action'];
  dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {  this.dataSource = new MatTableDataSource(ELEMENT_DATA);  }

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
