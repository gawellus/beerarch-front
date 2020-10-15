import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field'; 


import {MatRadioModule} from '@angular/material/radio'; 

import {MatAutocompleteModule} from '@angular/material/autocomplete'; 

import { MatSelectModule } from '@angular/material/select'; 


import {MatCardModule} from '@angular/material/card'; 


import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';

import { MatInputModule } from '@angular/material/input'; 
import { RouterModule } from '@angular/router';

import { BreweryService } from './brewery.service';
import { StyleService } from './style.service';


import {MatTableModule} from '@angular/material/table'; 

// import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BeerFormComponent } from './admin/beer-form/beer-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BeersComponent } from './beers/beers.component';
import { AdminBeersComponent } from './admin/admin-beers/admin-beers.component';
import { AdminBreweriesComponent } from './admin/admin-breweries/admin-breweries.component';
import { AdminCountriesComponent } from './admin/admin-countries/admin-countries.component';
import { AdminStylesComponent } from './admin/admin-styles/admin-styles.component';
import { LoginComponent } from './login/login.component';

import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor  } from './helpers/error.interceptor';

import { AuthGuard } from './helpers/auth.guard';
import { StylesComponent } from './admin/beer-form/form-components/styles/styles.component';
import { BreweriesComponent } from './admin/beer-form/form-components/breweries/breweries.component';
import { PhotoComponent } from './admin/beer-form/form-components/photo/photo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BeerService } from './beer.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BeerFormComponent,
    DashboardComponent,
    BeersComponent,
    AdminBeersComponent,
    AdminBreweriesComponent,
    AdminCountriesComponent,
    AdminStylesComponent,
    LoginComponent,
    StylesComponent,
    BreweriesComponent,
    PhotoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCardModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: 'login', component: LoginComponent },
      { path: 'beers', component: BeersComponent },
      { path: 'admin/beers', component: AdminBeersComponent, canActivate: [AuthGuard] },
      { path: 'admin/beers/new', component: BeerFormComponent, canActivate: [AuthGuard] },
      { path: 'admin/beers/:id', component: BeerFormComponent, canActivate: [AuthGuard] },
      { path: 'admin/breweries', component: AdminBreweriesComponent },
      { path: 'admin/countries', component: AdminCountriesComponent },
      { path: 'admin/styles', component: AdminStylesComponent }
    ]),
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    BreweryService,
    StyleService,
    BeerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
