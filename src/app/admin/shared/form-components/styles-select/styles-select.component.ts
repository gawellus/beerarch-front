import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Style } from '@shared/models/style';
import { StyleService } from '@shared/services/style.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'styles-select',
  templateUrl: './styles-select.component.html',
  styleUrls: ['./styles-select.component.css']
})
export class StylesSelectComponent implements OnInit {

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