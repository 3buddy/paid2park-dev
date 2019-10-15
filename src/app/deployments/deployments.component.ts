import { Component, OnInit , ViewChild} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



export interface PeriodicElement {
  DeploymentName: string;
  IsActive: string;
  Created: string;
  LastModified:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {DeploymentName: 'Dove Creek CO', IsActive: 'Yes', Created: '01/27/2019 3:40:17 PM',LastModified:'01/27/2019 3:40:17 PM'},
  {DeploymentName: 'DTPHX Test Deployment', IsActive: 'Yes', Created: '01/27/2019 3:40:17 PM',LastModified:'01/27/2019 3:40:17 PM'},
  {DeploymentName: 'Indian Wells Valley', IsActive: 'Yes', Created: '01/27/2019 3:40:17 PM',LastModified:'01/27/2019 3:40:17 PM'},
  {DeploymentName: 'Jons Test Deployment', IsActive: 'Yes', Created: '01/27/2019 3:40:17 PM',LastModified:'01/27/2019 3:40:17 PM'}
];


@Component({
  selector: 'app-deployments',
  templateUrl: './deployments.component.html',
  styleUrls: ['./deployments.component.css']
})
export class DeploymentsComponent implements OnInit {

  displayedColumns: string[] = ['DeploymentName', 'IsActive', 'Created','LastModified','Action'];
  dataSource: MatTableDataSource<PeriodicElement>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit() {
  
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
	
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
