import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { Brewery } from 'src/app/brewery';
import { BreweryService } from 'src/app/brewery.service';

@Component({
  selector: 'form-breweries',
  templateUrl: './breweries.component.html',
  styleUrls: ['./breweries.component.css']
})
export class BreweriesComponent implements OnInit {

  @Input() brewery: FormGroup;

  filteredBreweries: Observable<any[]>;
  importedData: Observable<any[]>;

  constructor(private breweryService: BreweryService) { }

  ngOnInit() {
    this.importedData = this.breweryService.getBreweries();
    this.filteredBreweries = this.brewery.controls['breweries'].valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(val => {
          return this.filter(val.name || val)
        })
      );
  }

  filter(val: string): Observable<Brewery[]> {
    return this.importedData
      .pipe(
        map(response => response.filter(option => {
          return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
        }))
      )
  }

  displayBreweryName(brewery: Brewery): string {
    return brewery && brewery.name ? brewery.name : '';
  }

}
