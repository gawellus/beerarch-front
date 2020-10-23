import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from './country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  PHP_API_SERVER = "beer.arch/api";

  constructor(private httpClient: HttpClient) { }

  getList(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${environment.apiUrl}/countries`);
  }

  saveCountry(data) {
    return this.httpClient.post(`${environment.apiUrl}/countries`, data, {observe: 'response'});
  }

  getCountryDetails(id: number): Observable<Country> {
    return this.httpClient.get<Country>(`${environment.apiUrl}/countries/`+id);
  }

  updateCountry(data, id: number) {
    return this.httpClient.post(`${environment.apiUrl}/countries/`+id, data, {observe: 'response'});
  }

  deleteCountry(id: number) {
    return this.httpClient.delete<Country>(`${environment.apiUrl}/countries/`+id, {observe: 'response'});
  }
}
