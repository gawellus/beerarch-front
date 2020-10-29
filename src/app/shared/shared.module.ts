import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material.module';
import { HeaderComponent } from './components/header/header.component';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { BeerService } from './services/beer.service';
import { BreweryService } from './services/brewery.service';
import { CountryService } from './services/country.service';
import { StyleService } from './services/style.service';
import { BackButtonDirective } from './back-button.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    MaterialModule,
  ],
  declarations: [
    HeaderComponent,
    BackButtonDirective
  ],
  exports: [
    HeaderComponent,
    BackButtonDirective
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CountryService,
    BreweryService,
    StyleService,
    BeerService
  ]
})
export class SharedModule { }
