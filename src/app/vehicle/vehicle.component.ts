import { Component, OnInit , ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router , ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';


export interface PeriodicElement {
  customer_vehicle_id: number;
  customer_id: number;
  license: string;
  make: string;
  model: string;
  color: string;
}

let ELEMENT_DATA: PeriodicElement[];


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  customerId: number;

  displayedColumns: string[] = ['license', 'make', 'model', 'color', 'Action'];
  dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private CM: CustomerService,
    public dialog: MatDialog,
    private router: Router,
    private ar: ActivatedRoute) { }


    openDialog(Id) {

      const dialogRef = this.dialog.open(DialogDeleteVehicle, {
        height: '18%',
        width: '25%',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.deleteVehicle(Id);
        }
      });
    }

  ngOnInit() {
     this.customerId = this.ar.snapshot.params['customerId'];
     this.getVehicleList();
  }


  getVehicleList() {
    this.CM.getVehicle(this.ar.snapshot.params['customerId']).subscribe( response => {
        ELEMENT_DATA = response['body'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }

  deleteVehicle(vehicleId) {
    this.CM.deleteVehicle(vehicleId)
    .subscribe(response => {
      this.getVehicleList();
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

export class DialogDeleteVehicle {}
