import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';

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
    AdminStylesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: 'beers', component: BeersComponent },
      { path: 'admin/beers', component: AdminBeersComponent },
      { path: 'admin/beers/new', component: BeerFormComponent },
      { path: 'admin/breweries', component: AdminBreweriesComponent },
      { path: 'admin/countries', component: AdminCountriesComponent },
      { path: 'admin/styles', component: AdminStylesComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
