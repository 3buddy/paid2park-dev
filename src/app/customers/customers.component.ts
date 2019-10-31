import { Component, OnInit , ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { CustomerService } from '../customer.service';


export interface PeriodicElement {
  customer_id: number;
  // DeploymentName: string;
  customer_first_name: string;
  customer_last_name: string;
  customer_email_address: string;
}

let ELEMENT_DATA: PeriodicElement[];

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  displayedColumns: string[] = ['DeploymentName', 'customer_first_name', 'customer_last_name', 'customer_email_address', 'Action'];
  dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( private CM: CustomerService , public dialog: MatDialog) {    }

  openDialog(Id) {

    const dialogRef = this.dialog.open(DialogDeleteCustomer, {
      height: '18%',
      width: '25%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteCustomer(Id);
      }
    });
  }

  ngOnInit() {
     this.getCustomerList();
  }


  getCustomerList() {
    this.CM.getCustomer().subscribe( response => {
        ELEMENT_DATA = response['body'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }

  deleteCustomer(customerId) {
    this.CM.deleteCustomer(customerId)
    .subscribe(response => {
      this.getCustomerList();
    });
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
  styleUrls: ['./dialog-content-css.css']
})

export class DialogDeleteCustomer {}
