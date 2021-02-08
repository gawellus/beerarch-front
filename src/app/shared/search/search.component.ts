import { Component, OnInit } from '@angular/core';
import { BeerService } from '@shared/services/beer.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  displayedColumns: string[] = ['no', 'name', 'brewery', 'style', 'date', 'rank'];
  dataSource = null;
  public isLoading = true;
  searchString = null;

  constructor(
    private beerService: BeerService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.searchString = this.route.snapshot.paramMap.get('word');

    this.beerService.searchABeer({ search: this.searchString }).subscribe(beers => {
      this.dataSource = new MatTableDataSource(beers);
      this.isLoading = false;
    });  
  }
}
