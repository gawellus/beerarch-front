import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Brewery } from './brewery';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BreweryService {

  PHP_API_SERVER = "beer.arch/api";

  constructor(private httpClient: HttpClient) { }

  getBreweries(): Observable<Brewery[]> {
    return this.httpClient.get<Brewery[]>(`${environment.apiUrl}/breweries`);
  }
}
