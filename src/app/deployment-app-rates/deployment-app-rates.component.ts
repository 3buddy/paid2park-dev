import { Component, OnInit , ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeploymentService } from '../deployment.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Router , ActivatedRoute } from '@angular/router';


export interface PeriodicElement {
  deployment_app_rate_id: number;
  deployment_id: number;
  deployment_app_rate_rate: string;
  deployment_app_rate_minutes: string;
}

let ELEMENT_DATA: PeriodicElement[];

@Component({
  selector: 'app-deployment-app-rates',
  templateUrl: './deployment-app-rates.component.html',
  styleUrls: ['./deployment-app-rates.component.css']
})
export class DeploymentAppRatesComponent implements OnInit {

  displayedColumns: string[] = ['deployment_app_rate_rate', 'deployment_app_rate_minutes', 'Action'];
  dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  deploymentId: number;

  constructor(
    public dialog: MatDialog,
    private services: DeploymentService,
    private router: Router,
    private ar: ActivatedRoute
    ) {  }

    openDialog(Id) {

      const dialogRef = this.dialog.open(DialogBoxComponent, {
        height: '18%',
        width: '25%',
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.deleteDeploymentAppRate(Id);
        }
      });
    }

  ngOnInit() {

    this.deploymentId = this.ar.snapshot.params['deploymentId'];
    this.services.getDeploymentAppRate(this.deploymentId).subscribe( (response) => {

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

  deleteDeploymentAppRate(Id) {
    this.services.deleteDeploymentAppRate(Id)
    .subscribe(response => {
      this.getDeploymentAppRate();
    });
  }

  getDeploymentAppRate() {
    this.services.getDeploymentAppRate(this.deploymentId).subscribe( (response) => {

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
