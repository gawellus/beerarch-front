import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Beer } from '@shared/models/beer';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BeerService {

  PHP_API_SERVER = "beer.arch/api";

  constructor(private httpClient: HttpClient) { }

  getBeerList(): Observable<Beer[]> {
    return this.httpClient.get<Beer[]>(`${environment.apiUrl}/beers`);
  }

  getBeerDetails(id): Observable<Beer> {
    return this.httpClient.get<Beer>(`${environment.apiUrl}/beers/`+id);
  }

  saveBeer(data) {
    this.httpClient.post(`${environment.apiUrl}/beers`, data).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }

  updateBeer(data, id) {
    this.httpClient.post(`${environment.apiUrl}/beers/`+id, data).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }

  
}
