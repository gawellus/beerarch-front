import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeerService } from '@shared/services/beer.service';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit {

  public latestBeer = null;
  public beerId: string;

  constructor(
    private beerService: BeerService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.beerId = this.route.snapshot.paramMap.get('id');

    if (this.beerId) {
      this.beerService.getBeerDetails(this.beerId).pipe(take(1)).subscribe(beer => {
        this.latestBeer = beer;
      });
    } else {
      this.router.navigate(['']);
    }
  }

  get photoUrl() {
    return environment.imagesUrl + this.latestBeer.photo;
  }
}
