import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BeerService } from '@shared/services/beer.service';
import { BreweryService } from '@shared/services/brewery.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public list: string;
  public dataSourceTab0 = null;
  public dataSourceTab1 = null;
  public dataSourceTab2 = null;
  public latestBeer = null;
  public initialParams = {
    sort: 'rating',
    order: 'DESC',
    limit: 10
  };
  public isLoading = true;
  public isTopLoading = true;

  constructor(private beerService: BeerService, private breweryService: BreweryService) {

  }

  ngOnInit(): void {
    this.beerService.getBeerList(this.initialParams).subscribe(beers => {
      this.dataSourceTab0 = new MatTableDataSource(beers);
      this.isLoading = false;
    });

    this.beerService.getBeerList({ limit: 10, sort: 'consumed_on', order: 'DESC' }).subscribe(beers => {
      this.dataSourceTab1 = new MatTableDataSource(beers);
      this.isLoading = false;
    });

    this.breweryService.getMostPopularBreweries().subscribe(breweries => {
      this.dataSourceTab2 = new MatTableDataSource(breweries);
      this.isLoading = false;
    });

    this.beerService.getLatestBeer().subscribe(beer => {
      this.latestBeer = beer;
      this.isTopLoading = false;
    });
  }

  get photoUrl() {
    return environment.imagesUrl + this.latestBeer.photo;
  }
}
