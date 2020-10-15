import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Beer } from 'src/app/beer';
import { BeerService } from 'src/app/beer.service';


@Component({
  selector: 'app-admin-beers',
  templateUrl: './admin-beers.component.html',
  styleUrls: ['./admin-beers.component.css']
})
export class AdminBeersComponent implements OnInit {

  displayedColumns: string[] = ['name', 'alc', 'rating', 'brewery', 'style', 'country', 'action']; 
  dataSource: MatTableDataSource<Beer>; 

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private beerService: BeerService) {}

  ngOnInit() {
    this.beerService.getBeerList().subscribe(beers => {
       this.dataSource = new MatTableDataSource(beers);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
    });
  }

}
