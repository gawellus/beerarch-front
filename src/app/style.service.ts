import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Style } from './style';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  PHP_API_SERVER = "beer.arch/api";

  constructor(private httpClient: HttpClient) { }

  getStyles(): Observable<Style[]> {
    return this.httpClient.get<Style[]>(`${environment.apiUrl}/styles`);
  }
}
