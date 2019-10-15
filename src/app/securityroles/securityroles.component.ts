import { Component, OnInit , ViewChild } from '@angular/core';

import { UserService } from '../user.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  role_id : number
  role_name: string;
  role_createdby: string;
  role_modifiedby: string;
}

let ELEMENT_DATA:PeriodicElement[];

@Component({
  selector: 'app-securityroles',
  templateUrl: './securityroles.component.html',
  styleUrls: ['./securityroles.component.css']
})
export class SecurityrolesComponent implements OnInit {

  
  displayedColumns: string[] = ['role_name','role_createdby','role_modifiedby','Action'];
  
  dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(protected _us : UserService) {
    
  }

  ngOnInit() {
  
    this._us.getRole()
    .subscribe(response =>{

      ELEMENT_DATA = response['body'];
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    
	
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
