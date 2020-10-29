import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Country } from '@shared/models/country';
import { CountryService } from '@shared/services/country.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'countries-select',
  templateUrl: './countries-select.component.html',
  styleUrls: ['./countries-select.component.css']
})
export class CountriesSelectComponent implements OnInit {

  @Input() country: FormGroup;

  filteredCountries: Observable<any[]>;
  importedData: Observable<any[]>;

  constructor(private countryService: CountryService) { }

  ngOnInit() {    
    this.importedData = this.countryService.getList();
    this.filteredCountries = this.country.controls['countries'].valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(val => {
          return this.filter(val.name || val)
        })
      );
  }

  filter(val: string): Observable<Country[]> {
    return this.importedData
      .pipe(
        map(response => response.filter(option => {
          return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
        }))
      )
  }

  displayCountryName(country: Country): string {
    return country && country.name ? country.name : '';
  }

  getErrorMessage() {
    return this.country.controls['countries'].hasError('required') ? 'Wybierz kraj z listy' :
      this.country.controls['countries'].hasError('incorrect') ? 'Nazwa niepoprawna' :
        '';
  }

}