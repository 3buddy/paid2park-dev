import { Component, OnInit , ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EnforcementService } from '../enforcement.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

export interface PeriodicElement {
  enforcements_id: number;
  DeploymentName: string;
  enforcements_assign_id: string;
  enforcements_first_name: string;
  enforcements_last_name: string;
  enforcements_address: string;
  enforcements_city: string;
  enforcements_state: string;
  enforcements_zip: string;
  enforcements_phone: string;
  enforcements_email: string;
  enforcements_dob: string;
  enforcements_ss: string;
  enforcements_hire_date: string;
  enforcements_start_date: string;
  enforcements_app_login: string;
  enforcements_hours_desired: string;
  enforcements_wage: string;
  enforcements_ticket_bonus: string;
  enforcements_w_4_with_holding: string;
  enforcements_start_with_holding: string;
  enforcements_comp_rate: string;
  enforcements_ot_rate: string;
}

let ELEMENT_DATA: PeriodicElement[];

@Component({
  selector: 'app-enforcements',
  templateUrl: './enforcements.component.html',
  styleUrls: ['./enforcements.component.css']
})
export class EnforcementsComponent implements OnInit {

 displayedColumns: string[] = ['DeploymentName', 'FirstName', 'LastName', 'Email', 'PhoneNumber', 'Action'];

  dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private services: EnforcementService, public dialog: MatDialog) {
  }

  openDialog(Id) {

    const dialogRef = this.dialog.open(DialogBoxComponent, {
      height: '18%',
      width: '25%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteEnforcements(Id);
      }
    });
  }

  ngOnInit() {

    this.services.getEnforcements().subscribe( (response) => {

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

  deleteEnforcements(Id) {
    this.services.deleteEnforcements(Id)
    .subscribe(response => {
      this.getEnforcements();
    });
  }

  getEnforcements() {
    this.services.getEnforcements().subscribe( (response) => {

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
