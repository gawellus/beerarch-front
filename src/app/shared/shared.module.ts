import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryService } from './services/country.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [],
  providers: [
    CountryService
  ]
})
export class SharedModule { }
