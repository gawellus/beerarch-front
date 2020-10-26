import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';
import { Style } from '../../../../style';
import { StyleService } from '../../../../style.service';

@Component({
  selector: 'form-styles',
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.css']
})
export class CountriesComponent implements OnInit {

  @Input() style: FormGroup;

  filteredStyles: Observable<any[]>;
  importedData: Observable<any[]>;

  constructor(private styleService: StyleService) { }

  ngOnInit() {    
    this.importedData = this.styleService.getStyles();
    this.filteredStyles = this.style.controls['styles'].valueChanges
      .pipe(
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(val => {
          return this.filter(val.name || val)
        })
      );
  }

  filter(val: string): Observable<Style[]> {
    return this.importedData
      .pipe(
        map(response => response.filter(option => {
          return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
        }))
      )
  }

  displayStyleName(style: Style): string {
    return style && style.name ? style.name : '';
  }

  getErrorMessage() {
    return this.style.controls['styles'].hasError('required') ? 'You must choose a value' :
      this.style.controls['styles'].hasError('incorrect') ? 'Not a valid brewery' :
        '';
  }

}