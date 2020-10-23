import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CountryService } from 'src/app/country.service';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.css']
})
export class CountryFormComponent implements OnInit {

  form: FormGroup;
  countryId: number;

  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });

    this.countryId = +this.route.snapshot.paramMap.get('id');

    if (this.countryId) {
      this.countryService.getCountryDetails(this.countryId).pipe(take(1)).subscribe((res) => {
        this.form.patchValue({
          name: res.name,
        });
      }
      );
    }
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.countryId) {
        this.countryService.updateCountry(this.toFormData(this.form.value), this.countryId).subscribe(resp => {
          if(resp.status == 200) {
            this.router.navigate(['/admin/countries']);
          }
       })        
      } else {
        this.countryService.saveCountry(this.toFormData(this.form.value)).subscribe(resp => {
          if(resp.status == 201) {
            this.router.navigate(['/admin/countries']);
          }
        });
      }
    }
  }

  toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    if (this.countryId) {
      formData.append('_method', 'PUT');
    }
    return formData;
  }
}
