import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BreweryService } from '@shared/services/brewery.service';
import { take } from 'rxjs/operators';

import { autocompleteValueValidator } from '../../shared/custom-validators/autocomplete-value.validator';

@Component({
  selector: 'app-breweries-form',
  templateUrl: './breweries-form.component.html',
  styleUrls: ['./breweries-form.component.css']
})
export class BreweriesFormComponent implements OnInit {
  form: FormGroup;
  breweryId: number;

  constructor(
    private formBuilder: FormBuilder,
    private breweryService: BreweryService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      countries: ['', [Validators.required, autocompleteValueValidator]],
    });

    this.breweryId = +this.route.snapshot.paramMap.get('id');

    if (this.breweryId) {
      this.breweryService.getBreweryDetails(this.breweryId).pipe(take(1)).subscribe((res) => {
        this.form.patchValue({
          name: res.name,
          countries: res.country,
        });
      }
      );
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (this.breweryId) {
        console.log(this.form.value);
        this.breweryService.updateBrewery(this.toFormData(this.form.value), this.breweryId).subscribe(resp => {
          if(resp.status === 200) {
            this.router.navigate(['/admin/breweries']);
          }
       })
      } else {
        this.breweryService.saveBrewery(this.toFormData(this.form.value)).subscribe(resp => {
          if(resp.status === 201) {
            this.router.navigate(['/admin/breweries']);
          }
        });
      }
    }
  }

  toFormData<T>(formValue: T): FormData {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    formData.append('country_id', this.form.get('countries').value.id);
    formData.delete('countries');
    if (this.breweryId) {
      formData.append('_method', 'PUT');
    }
    return formData;
  }
}
