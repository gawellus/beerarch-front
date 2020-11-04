import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { BeerService } from '@shared/services/beer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public list: string;
  public dataSource = null;
  public initialParams = {
    'sort': 'rating',
    'order': 'DESC',
    'limit': 10
  };

  constructor(private beerService: BeerService) {
    
   }

  ngOnInit(): void {
    this.getBeers(this.initialParams);
  }

  tabClick(tab) {
    let index = tab.index;
    switch (index) {
      case 1:
        console.log(index);        
        console.log('all');        
          this.getBeers();
          break;
      case 2:
        this.dataSource = null;
        console.log(index);
        console.log('null');                  
          break;
      case 0:
      default:        
      console.log(index);
      console.log(this.initialParams.limit);        
        this.getBeers(this.initialParams);
        break;
  }



    // if(index === 1) {
    //   const params = {
    //     'sort': 'rating',
    //     'order': 'DESC',
    //     'limit': 10
    //   };
    //   this.getBeers(params);
    // }
    // else {
    //   this.getBeers();
    // }
  }

  async getBeers(params?) {
    this.dataSource = null;
    this.beerService.getBeerList(params).subscribe(beers => {
      this.dataSource = new MatTableDataSource(beers);
   });
  }

}
