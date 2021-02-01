import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Style } from '@shared/models/style';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  constructor(private httpClient: HttpClient) { }

  getStyles(): Observable<Style[]> {
    return this.httpClient.get<Style[]>(`${environment.apiUrl}/styles`);
  }

  saveStyle(data) {
    return this.httpClient.post(`${environment.apiUrl}/styles`, data, {observe: 'response'});
  }

  getStyleDetails(id: number): Observable<Style> {
    return this.httpClient.get<Style>(`${environment.apiUrl}/styles/` + id);
  }

  updateStyle(data, id: number) {
    return this.httpClient.post(`${environment.apiUrl}/styles/` + id, data, {observe: 'response'});
  }
}
