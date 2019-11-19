import { Component, OnInit , ViewChild} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PassesService } from '../passes.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';


export interface PeriodicElement {
  passes_id: number;
  passes_license: string;
  passes_customers_name: string;
  passes_package: string;
  passes_price: string;
  passes_amount_paid: string;
  passes_funds_by: string;
  passes_reason: string;
  passes_start_date: string;
  passes_end_date: string;
}

let ELEMENT_DATA: PeriodicElement[];

@Component({
  selector: 'app-passes',
  templateUrl: './passes.component.html',
  styleUrls: ['./passes.component.css']
})
export class PassesComponent implements OnInit {

  displayedColumns: string[] = ['CustomerName', 'License', 'PassNumber', 'AmountPaid', 'Fundsby', 'Action'];

  dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private services: PassesService, public dialog: MatDialog) {
  }

  openDialog(Id) {

    const dialogRef = this.dialog.open(DialogBoxComponent, {
      height: '18%',
      width: '25%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deletePasses(Id);
      }
    });
  }

  ngOnInit() {
    this.services.getPasses().subscribe( (response) => {

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

  deletePasses(Id) {
    this.services.deletePasses(Id)
    .subscribe(response => {
      this.getPasses();
    });
  }

  getPasses() {
    this.services.getPasses().subscribe( (response) => {

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
