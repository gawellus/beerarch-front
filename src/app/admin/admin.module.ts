import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminBeersComponent } from './components/admin-beers/admin-beers.component';
import { AdminBreweriesComponent } from './components/admin-breweries/admin-breweries.component';
import { AdminCountriesComponent } from './components/admin-countries/admin-countries.component';
import { AdminStylesComponent } from './components/admin-styles/admin-styles.component';
import { BeerFormComponent } from './components/beer-form/beer-form.component';
import { BreweriesFormComponent } from './components/breweries-form/breweries-form.component';
import { CountryFormComponent } from './components/country-form/country-form.component';
import { StyleFormComponent } from './components/style-form/style-form.component';
import { BreweriesSelectComponent } from './shared/form-components/breweries-select/breweries-select.component';
import { PhotoUploadComponent } from './shared/form-components/photo-upload/photo-upload.component';
import { StylesSelectComponent } from './shared/form-components/styles-select/styles-select.component';
import { CountriesSelectComponent } from './shared/form-components/countries-select/countries-select.component'
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    RouterModule.forChild([]),
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    AdminBeersComponent,
    AdminBreweriesComponent,
    AdminCountriesComponent,
    AdminStylesComponent,
    BeerFormComponent,
    StyleFormComponent,
    CountryFormComponent,
    BreweriesFormComponent,
    PhotoUploadComponent,
    BreweriesSelectComponent,
    StylesSelectComponent,
    CountriesSelectComponent
  ],
  exports: [
    AdminBeersComponent,
    AdminBreweriesComponent,
    AdminCountriesComponent,
    AdminStylesComponent,
    BeerFormComponent,
    StyleFormComponent,
    CountryFormComponent,
    BreweriesFormComponent,
    PhotoUploadComponent,
    BreweriesSelectComponent,
    StylesSelectComponent,
    CountriesSelectComponent
  ],
})
export class AdminModule { }
