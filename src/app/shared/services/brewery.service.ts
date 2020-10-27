import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brewery } from '@shared/models/brewery';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

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