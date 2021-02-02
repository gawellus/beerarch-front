import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Beer } from '@shared/models/beer';
import { Brewery } from '@shared/models/brewery';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BeerService {

  constructor(private httpClient: HttpClient) { }

  getBeerList(param?): Observable<Beer[]> {
    return this.httpClient.get<Beer[]>(`${environment.apiUrl}/beers`, {params: param});
  }

  getBeerDetails(id): Observable<Beer> {
    return this.httpClient.get<Beer>(`${environment.apiUrl}/beers/` + id);
  }

  saveBeer(data) {
    return this.httpClient.post(`${environment.apiUrl}/beers`, data, {observe: 'response'});
  }

  updateBeer(data, id) {
    return this.httpClient.post(`${environment.apiUrl}/beers/` + id, data, {observe: 'response'});
  }

  getLatestBeer(): Observable<Beer> {
    return this.httpClient.get<Beer>(`${environment.apiUrl}/beers/latest`);
  }

  searchABeer(param?): Observable<Beer[]> {
    return this.httpClient.get<Beer[]>(`${environment.apiUrl}/beers/search`, {params: param});
  }

}
