import { Component, OnInit , ViewChild} from '@angular/core';


import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  CustomerName: string;
  License: string;
  PassNumber: string;
  AmountPaid:string;
  Fundsby:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {CustomerName: 'John Mac', License: 'S530-429-085-151',PassNumber: '18032714540001',AmountPaid:'$ 48.78',Fundsby:'Card'},
  {CustomerName: 'Rusi Hart', License: 'S530-429-085-152',PassNumber: '18032714540002',AmountPaid:'$ 60.78',Fundsby:'Cash'},
  {CustomerName: 'Cristal Roz', License: 'S530-429-085-153',PassNumber: '18032714540003',AmountPaid:'$ 58.78',Fundsby:'Card'},
  {CustomerName: 'Lucci Hart', License: 'S530-429-085-154',PassNumber: '18032714540004',AmountPaid:'$ 68.78',Fundsby:'Cheque'}
];

@Component({
  selector: 'app-passes',
  templateUrl: './passes.component.html',
  styleUrls: ['./passes.component.css']
})
export class PassesComponent implements OnInit {

  displayedColumns: string[] = ['CustomerName', 'License', 'PassNumber','AmountPaid','Fundsby','Action'];
  
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
