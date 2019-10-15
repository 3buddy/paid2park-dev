import { Component, OnInit , ViewChild} from '@angular/core';

import { UserService } from '../user.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



export interface PeriodicElement {
  claim_id : number;
  claim_name: string;
  claim_createdby : string;
  claim_modifiedby : string;
}

let ELEMENT_DATA: PeriodicElement[];

@Component({
  selector: 'app-securityclaims',
  templateUrl: './securityclaims.component.html',
  styleUrls: ['./securityclaims.component.css']
})

export class SecurityclaimsComponent implements OnInit {

  displayedColumns: string[] = ['claim_id','claim_name','claim_createdby','claim_modifiedby'];
  dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( protected _us : UserService ) {
   
  }

  ngOnInit() {


    this._us.getClaim()
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

