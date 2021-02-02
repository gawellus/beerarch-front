import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminModule } from 'src/app/admin/admin.module';

import { AppComponent } from './app.component';
import { BeersComponent } from './beers/beers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.module';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { DatePipe } from '@angular/common';
import { AuthGuard } from 'src/app/shared/helpers/auth.guard';
import { SearchComponent } from './shared/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BeersComponent,
    LoginComponent,
    SearchComponent
  ],
  imports: [
    AdminModule,
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MaterialModule,
    MomentDateModule,
    RouterModule.forRoot([
      { path: '', component: DashboardComponent },
      { path: 'login', component: LoginComponent },
      { path: 'beers/:id', component: BeersComponent, canActivate: [AuthGuard] },
      { path: 'search/:word', component: SearchComponent }
    ]),
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
