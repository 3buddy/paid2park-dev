import { Component, OnInit , ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeploymentService } from '../deployment.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';



export interface PeriodicElement {
  deployment_id: number;
  deployment_name: string;
  deployment_billing_phone: string;
  deployment_billing_email: string;
  deployment_status: string;
}

let ELEMENT_DATA: PeriodicElement[];


@Component({
  selector: 'app-deployments',
  templateUrl: './deployments.component.html',
  styleUrls: ['./deployments.component.css']
})
export class DeploymentsComponent implements OnInit {

  displayedColumns: string[] = ['deployment_name', 'deployment_billing_phone', 'deployment_billing_email', 'Status', 'Action'];
  dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private services: DeploymentService
    ) {  }

    openDialog(Id) {

      const dialogRef = this.dialog.open(DialogBoxComponent, {
        height: '18%',
        width: '25%',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.deleteDeployments(Id);
        }
      });
    }

  ngOnInit() {

    this.services.getDeployment().subscribe( (response) => {

      if (response['status'] === 1) {
        ELEMENT_DATA = response['body'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        ELEMENT_DATA = response['body'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }

    });
  }

  deleteDeployments(Id) {
    this.services.deleteDeployment(Id)
    .subscribe(response => {
      this.getDeployments();
    });
  }

  getDeployments() {
    this.services.getDeployment().subscribe( (response) => {

      if (response['status'] === 1) {
        ELEMENT_DATA = response['body'];
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        ELEMENT_DATA = response['body'];
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
