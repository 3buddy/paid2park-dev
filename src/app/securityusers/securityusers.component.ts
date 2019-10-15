import { Component, OnInit  , ViewChild} from '@angular/core';


import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  Id:number,
  AllDeployments: Array<string>;
  FullName: string;
  Email: string;
  RoleName:string;
  IsActive:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Id:1,AllDeployments: ['DTPHS Test Deployment', 'Jenis Test David Deployment', 'Indian Wells Valley','Dove Creek CO'],FullName: 'David Admin',Email: 'davidadmin@gmail.com',RoleName:'Administrator',IsActive:'Yes'},
  {Id:2,AllDeployments: ['DTPHS Test Deployment'],FullName: 'Test Aque Track',Email: 'testaquetrack@gmail.com',RoleName:'Deployment Manager',IsActive:'Yes'},
  {Id:3,AllDeployments: ['Indians Wells Valley'],FullName: 'Amber Chapin',Email: 'amber.chapin@hgmail.com	',RoleName:'Deployment Service Account',IsActive:'Yes'},
  {Id:4,AllDeployments: ['DTPHS Test Deployment', 'Jenis Test David Deployment', 'Indian Wells Valley',' Dove Creek CO'],FullName: 'Gienn Kess',Email: 'giennkess@gmail.com',RoleName:'Deployment User',IsActive:'Yes'},
  {Id:5,AllDeployments: ['Jonis Test Deployment'	, 'Jenis Test David Deployment', 'Indian Wells Valley',' Dove Creek CO'],FullName: 'Gienn Kess',Email: 'giennkess@gmail.com',RoleName:'CreateAccountRate',IsActive:'Yes'}
];

@Component({
  selector: 'app-securityusers',
  templateUrl: './securityusers.component.html',
  styleUrls: ['./securityusers.component.css']
})
export class SecurityusersComponent implements OnInit {


  displayedColumns: string[] = ['AllDeployments', 'FullName', 'Email','RoleName','IsActive','Action'];
  
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
