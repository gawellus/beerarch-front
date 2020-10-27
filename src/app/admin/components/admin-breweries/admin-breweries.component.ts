import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Brewery } from '@shared/models/brewery';
import { BreweryService } from '@shared/services/brewery.service';

@Component({
  selector: 'app-admin-breweries',
  templateUrl: './admin-breweries.component.html',
  styleUrls: ['./admin-breweries.component.css']
})
export class AdminBreweriesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'country', 'action']; 
  dataSource: MatTableDataSource<Brewery>; 

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private breweryService: BreweryService) {}

  ngOnInit() {
    this.breweryService.getBreweries().subscribe(breweries => {
       this.dataSource = new MatTableDataSource(breweries);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
    });
  }

}
