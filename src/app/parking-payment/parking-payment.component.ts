import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentService } from '../payment.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

export interface PeriodicElement {
  parking_payment_id: number;
  parking_payment_license: string;
  parking_payment_customer_name: string;
  parking_payment_app_packages_available: string;
  parking_payment_min_to_add_to_account: string;
  parking_payment_parking_amount_paid: string;
  parking_payment_funds_by: string;
}

let ELEMENT_DATA: PeriodicElement[];

@Component({
  selector: 'app-parking-payment',
  templateUrl: './parking-payment.component.html',
  styleUrls: ['./parking-payment.component.css']
})
export class ParkingPaymentComponent implements OnInit {

  displayedColumns: string[] = ['CustomerName', 'License' , 'AmountPaid', 'Fundsby', 'Action'];
  dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private services: PaymentService , public dialog: MatDialog ) {
  }

  openDialog(Id) {

    const dialogRef = this.dialog.open(DialogBoxComponent, {
      height: '18%',
      width: '25%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deletePayment(Id);
      }
    });
  }

  ngOnInit() {

    this.services.getParkingPayment().subscribe( (response) => {

       if (response['status'] === 1) {
        ELEMENT_DATA = response['body'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
       } else {
        ELEMENT_DATA = [];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
       }

    });
  }

  deletePayment(Id) {
    this.services.deleteParkingPayment(Id)
    .subscribe(response => {
      this.getPayment();
    });
  }

  getPayment() {
    this.services.getParkingPayment().subscribe( (response) => {

      if ( response['status'] === 1) {

        ELEMENT_DATA = response['body'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      } else {

        ELEMENT_DATA = [];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      }
  });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
