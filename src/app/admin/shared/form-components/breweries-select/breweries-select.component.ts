import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Brewery } from '@shared/models/brewery';
import { BreweryService } from '@shared/services/brewery.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'breweries-select',
  templateUrl: './breweries-select.component.html',
  styleUrls: ['./breweries-select.component.css']
})
export class BreweriesSelectComponent implements OnInit {

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

  getErrorMessage() {
    return this.brewery.controls['breweries'].hasError('required') ? 'You must choose a value' :
      this.brewery.controls['breweries'].hasError('incorrect') ? 'Not a valid brewery' :
        '';
  }

}
