import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/helpers/auth.guard';

import { AdminBeersComponent } from './components/admin-beers/admin-beers.component';
import { AdminBreweriesComponent } from './components/admin-breweries/admin-breweries.component';
import { AdminCountriesComponent } from './components/admin-countries/admin-countries.component';
import { AdminStylesComponent } from './components/admin-styles/admin-styles.component';
import { BeerFormComponent } from './components/beer-form/beer-form.component';
import { BreweriesFormComponent } from './components/breweries-form/breweries-form.component';
import { CountryFormComponent } from './components/country-form/country-form.component';
import { StyleFormComponent } from './components/style-form/style-form.component';

const routes: Routes = [
  { path: 'admin/beers/new', component: BeerFormComponent, canActivate: [AuthGuard] },
  { path: 'admin/beers/:id', component: BeerFormComponent, canActivate: [AuthGuard] },
  { path: 'admin/beers', component: AdminBeersComponent, canActivate: [AuthGuard] },
  { path: 'admin/breweries/new', component: BreweriesFormComponent, canActivate: [AuthGuard] },
  { path: 'admin/breweries/:id', component: BreweriesFormComponent, canActivate: [AuthGuard] },
  { path: 'admin/breweries', component: AdminBreweriesComponent, canActivate: [AuthGuard] },
  { path: 'admin/countries/new', component: CountryFormComponent, canActivate: [AuthGuard] },
  { path: 'admin/countries/:id', component: CountryFormComponent, canActivate: [AuthGuard] },
  { path: 'admin/countries', component: AdminCountriesComponent, canActivate: [AuthGuard] },
  { path: 'admin/styles/new', component: StyleFormComponent, canActivate: [AuthGuard] },
  { path: 'admin/styles/:id', component: StyleFormComponent, canActivate: [AuthGuard] },
  { path: 'admin/styles', component: AdminStylesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
