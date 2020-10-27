import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Country } from '@shared/models/country';
import { CountryService } from '@shared/services/country.service';


@Component({
  selector: 'app-admin-countries',
  templateUrl: './admin-countries.component.html',
  styleUrls: ['./admin-countries.component.css']
})
export class AdminCountriesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'action']; 
  dataSource: MatTableDataSource<Country>; 

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private countryService: CountryService, private router: Router) {}

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.countryService.getList().subscribe(countries => {
      this.dataSource = new MatTableDataSource(countries);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
   });
  }

  deleteItem(id) {
    if(!confirm('Sure?')) return;
    this.countryService.deleteCountry(id).subscribe(
      resp => {           
        if(resp.status == 200) {
          this.getCountries();          
        }
     })
  }
}
