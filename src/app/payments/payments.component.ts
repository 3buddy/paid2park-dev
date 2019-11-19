import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentService } from '../payment.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';


export interface PeriodicElement {
      ticket_payment_id: number;
      ticket_payment_tickets: string;
      ticket_payment_license: string;
      ticket_payment_ticket_fee: string;
      ticket_payment_ticket_date: string;
      ticket_payment_ticket_discount: string;
      ticket_payment_ticket_balance: string;
      ticket_payment_payment_amount: string;
      ticket_payment_funded_by: string;
      ticket_payment_balance_on_ticket: string;
}

let ELEMENT_DATA: PeriodicElement[];

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

displayedColumns: string[] = ['TicketFee', 'License', 'TicketNumber', 'AmountPaid', 'Fundsby', 'Action'];
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

    this.services.getTicketPayment().subscribe( (response) => {

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
    this.services.deleteTicketPayment(Id)
    .subscribe(response => {
      this.getPayment();
    });
  }

  getPayment() {
    this.services.getTicketPayment().subscribe( (response) => {

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
