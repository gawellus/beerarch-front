import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';

import { AdminBeersComponent } from './admin/admin-beers/admin-beers.component';
import { AdminBreweriesComponent } from './admin/admin-breweries/admin-breweries.component';
import { BreweriesFormComponent } from './admin/admin-breweries/breweries-form/breweries-form.component';
import { AdminCountriesComponent } from './admin/admin-countries/admin-countries.component';
import { CountryFormComponent } from './admin/admin-countries/country-form/country-form.component';
import { AdminStylesComponent } from './admin/admin-styles/admin-styles.component';
import { StyleFormComponent } from './admin/admin-styles/style-form/style-form.component';
import { BeerFormComponent } from './admin/beer-form/beer-form.component';
import { BreweriesComponent } from './admin/beer-form/form-components/breweries/breweries.component';
import { PhotoComponent } from './admin/beer-form/form-components/photo/photo.component';
import { StylesComponent } from './admin/beer-form/form-components/styles/styles.component';
import { AppComponent } from './app.component';
import { BeerService } from './beer.service';
import { BeersComponent } from './beers/beers.component';
import { BreweryService } from './brewery.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { AuthGuard } from './helpers/auth.guard';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { StyleService } from './style.service';

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
    PhotoComponent,
    StyleFormComponent,
    CountryFormComponent,
    BreweriesFormComponent    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MaterialModule,
    SharedModule,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: 'login', component: LoginComponent },
      { path: 'beers', component: BeersComponent },      
      { path: 'admin/beers/new', component: BeerFormComponent, canActivate: [AuthGuard] },
      { path: 'admin/beers/:id', component: BeerFormComponent, canActivate: [AuthGuard] },
      { path: 'admin/beers', component: AdminBeersComponent, canActivate: [AuthGuard] },      
      { path: 'admin/breweries/new', component: AdminBreweriesComponent, canActivate: [AuthGuard] },
      { path: 'admin/breweries/:id', component: AdminBreweriesComponent, canActivate: [AuthGuard] },
      { path: 'admin/breweries', component: AdminBreweriesComponent },
      { path: 'admin/countries/new', component: CountryFormComponent, canActivate: [AuthGuard] },
      { path: 'admin/countries/:id', component: CountryFormComponent, canActivate: [AuthGuard] },
      { path: 'admin/countries', component: AdminCountriesComponent, canActivate: [AuthGuard] },
      { path: 'admin/styles/new', component: StyleFormComponent, canActivate: [AuthGuard] },
      { path: 'admin/styles/:id', component: StyleFormComponent, canActivate: [AuthGuard] },
      { path: 'admin/styles', component: AdminStylesComponent, canActivate: [AuthGuard] }
    ])    
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
