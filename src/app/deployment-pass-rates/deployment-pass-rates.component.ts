import { Component, OnInit , ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeploymentService } from '../deployment.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Router , ActivatedRoute } from '@angular/router';


export interface PeriodicElement {
  deployment_pass_rate_id: number;
  deployment_id: string;
  deployment_pass_rate_name: string;
  deployment_pass_rate_day: string;
  deployment_pass_rate_cost: string;
  deployment_pass_rate_status: string;
}

let ELEMENT_DATA: PeriodicElement[];

@Component({
  selector: 'app-deployment-pass-rates',
  templateUrl: './deployment-pass-rates.component.html',
  styleUrls: ['./deployment-pass-rates.component.css']
})
export class DeploymentPassRatesComponent implements OnInit {

  displayedColumns: string[] = ['deployment_pass_rate_name', 'deployment_pass_rate_day', 'deployment_pass_rate_cost', 'Status' , 'Action'];
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
          this.deleteDeploymentPassRate(Id);
        }
      });
    }

  ngOnInit() {

    this.deploymentId = this.ar.snapshot.params['deploymentId'];
    this.services.getDeploymentPassRate(this.deploymentId).subscribe( (response) => {

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

  deleteDeploymentPassRate(Id) {
    this.services.deleteDeploymentPassRate(Id)
    .subscribe(response => {
      this.getDeploymentPassRate();
    });
  }

  getDeploymentPassRate() {
    this.services.getDeploymentPassRate(this.deploymentId).subscribe( (response) => {

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
