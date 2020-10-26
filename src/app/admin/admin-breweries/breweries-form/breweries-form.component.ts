import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { BreweryService } from 'src/app/brewery.service';
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
      breweries: ['', [Validators.required, autocompleteValueValidator]],
    });

    this.breweryId = +this.route.snapshot.paramMap.get('id');

    if (this.breweryId) {
      // this.breweryService.getStyleDetails(this.styleId).pipe(take(1)).subscribe((res) => {
      //   this.form.patchValue({
      //     name: res.name,
      //   });
      // }
      // );
    }
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.breweryId) {
      //   this.breweryService.updateStyle(this.toFormData(this.form.value), this.styleId).subscribe(resp => {
      //     if(resp.status == 200) {
      //       this.router.navigate(['/admin/styles']);
      //     }
      //  })        
      } else {        
        // this.breweryService.saveStyle(this.toFormData(this.form.value)).subscribe(resp => {
        //   if(resp.status == 201) {
        //     this.router.navigate(['/admin/styles']);
        //   }
        // });        
      }
    }
  }

  toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    if (this.breweryId) {
      formData.append('_method', 'PUT');
    }
    return formData;
  }
}
