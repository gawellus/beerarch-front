import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Beer } from '@shared/models/beer';
import { BeerService } from '@shared/services/beer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-beers',
  templateUrl: './admin-beers.component.html',
  styleUrls: ['./admin-beers.component.css']
})
export class AdminBeersComponent implements OnInit {

  displayedColumns: string[] = ['photo', 'name', 'alc', 'rating', 'brewery', 'style', 'country', 'consumed_on', 'action'];
  dataSource: MatTableDataSource<Beer>;
  public photoUrl = environment.imagesUrl;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private beerService: BeerService) {}

  ngOnInit() {
    this.beerService.getBeerList({sort: 'consumed_on', order: 'DESC'}).subscribe(beers => {
       this.dataSource = new MatTableDataSource(beers);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
