import { Component, OnInit  , ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';


import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { UserService } from '../user.service'


export interface PeriodicElement {
  Id:number,
  //AllDeployments: Array<string>;
  FullName: string;
  Email: string;
  RoleName:string;
  IsActive:string;
}

let ELEMENT_DATA: PeriodicElement[];

@Component({
  selector: 'app-securityusers',
  templateUrl: './securityusers.component.html',
  styleUrls: ['./securityusers.component.css']
})


export class SecurityusersComponent implements OnInit {


  displayedColumns: string[] = ['AllDeployments','FullName', 'Email','RoleName','IsActive','Action'];
  
  dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  

  constructor(private US : UserService,public dialog: MatDialog) {
    
  }


  openDialog(Id) {

    const dialogRef = this.dialog.open(DialogContentExampleDialog,{
      height: '18%',
      width: '25%',
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result === true)
      {
        this.deleteUser(Id);
        console.log('deleted');
        this.applyFilter('');
      }

    });
  }

  ngOnInit() {
    this.getUserList();
  }

  getUserList()
  {
    this.US.getUser()
    .subscribe( response =>{

      ELEMENT_DATA = response['body'];
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  deleteUser(Id)
  {
    this.US.deleteUser(Id).subscribe(response=>{
      return Id;
    })
    

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.html',
  styleUrls:['./dialog-content-css.css']
})

export class DialogContentExampleDialog {}
