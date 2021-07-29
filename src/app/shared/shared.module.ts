import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material.module';
import { HeaderComponent } from './components/header/header.component';
import { JwtInterceptor, ErrorInterceptor, appInitializer } from './helpers';
import { BeerService } from './services/beer.service';
import { BreweryService } from './services/brewery.service';
import { CountryService } from './services/country.service';
import { StyleService } from './services/style.service';
import { BackButtonDirective } from './back-button.directive';
import { TopListComponent } from './components/top-list/top-list.component';
import { RankColorPipe } from './rank-color.pipe';
import { PopularListComponent } from './components/popular-list/popular-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  declarations: [
    HeaderComponent,
    BackButtonDirective,
    TopListComponent,
    RankColorPipe,
    PopularListComponent,
    SidenavListComponent
  ],
  exports: [
    HeaderComponent,
    BackButtonDirective,
    TopListComponent,
    RankColorPipe,
    PopularListComponent,
    FlexLayoutModule,
    SidenavListComponent
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService] },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    CountryService,
    BreweryService,
    StyleService,
    BeerService
  ]
})
export class SharedModule { }
