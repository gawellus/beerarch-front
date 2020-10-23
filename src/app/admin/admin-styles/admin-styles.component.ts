import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Style } from 'src/app/style';
import { StyleService } from 'src/app/style.service';

@Component({
  selector: 'app-admin-styles',
  templateUrl: './admin-styles.component.html',
  styleUrls: ['./admin-styles.component.css']
})
export class AdminStylesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'action']; 
  dataSource: MatTableDataSource<Style>; 

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private styleService: StyleService) {}

  ngOnInit() {
    this.styleService.getStyles().subscribe(styles => {
       this.dataSource = new MatTableDataSource(styles);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
    });
  }

}
