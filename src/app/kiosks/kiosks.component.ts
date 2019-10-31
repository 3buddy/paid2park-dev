import { Component, OnInit , ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { KioskService } from '../kiosk.service';


export interface PeriodicElement {
  kiosk_Id: number;
  kiosks_number: string;
  kiosks_mac_address: string;
  kiosks_guid: string;
  kiosks_password: string;
  kiosks_location_address: string;
  kiosks_city: string;
  kiosks_network_login: string;
  kiosks_network_password: string;
}

let ELEMENT_DATA: PeriodicElement[];


@Component({
  selector: 'app-kiosks',
  templateUrl: './kiosks.component.html',
  styleUrls: ['./kiosks.component.css']
})
export class KiosksComponent implements OnInit {

  displayedColumns: string[] = [
    'DeploymentName',
    'kiosks_number',
    'kiosks_location_address',
    'kiosks_mac_address',
    'kiosks_guid',
    'Action'];

  dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private ks: KioskService , public dialog: MatDialog) {}

  openDialog(Id) {

    const dialogRef = this.dialog.open(DialogDeleteKiosk, {
      height: '18%',
      width: '25%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteKiosk(Id);
      }
    });
  }

  ngOnInit() {

    this.getKioskList();

  }


  getKioskList() {
    this.ks.getKiosk().subscribe( response => {
        ELEMENT_DATA = response['body'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }

  deleteKiosk(kioskId) {
    this.ks.deleteKiosk(kioskId)
    .subscribe(response => {
      this.getKioskList();
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

export class DialogDeleteKiosk {}

