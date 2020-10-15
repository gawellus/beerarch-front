import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { Beer } from './beer';

@Injectable({
  providedIn: 'root'
})

export class BeerService {

  PHP_API_SERVER = "beer.arch/api";

  constructor(private httpClient: HttpClient) { }

  getBeerList(): Observable<Beer[]> {
    return this.httpClient.get<Beer[]>(`${environment.apiUrl}/beers`);
  }

  getBeerDetails(beerId): Observable<Beer> {
    return this.httpClient.get<Beer>(`${environment.apiUrl}/beers/`+beerId);
  }

  saveBeer(data) {
    this.httpClient.post(`${environment.apiUrl}/beers`, data).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }
}
