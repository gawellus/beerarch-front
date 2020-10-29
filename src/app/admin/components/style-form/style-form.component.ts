import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StyleService } from '@shared/services/style.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-style-form',
  templateUrl: './style-form.component.html',
  styleUrls: ['./style-form.component.css']
})
export class StyleFormComponent implements OnInit {
  form: FormGroup;
  styleId: number;

  constructor(
    private formBuilder: FormBuilder,
    private styleService: StyleService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });

    this.styleId = +this.route.snapshot.paramMap.get('id');

    if (this.styleId) {
      this.styleService.getStyleDetails(this.styleId).pipe(take(1)).subscribe((res) => {
        this.form.patchValue({
          name: res.name,
        });
      }
      );
    }
  }

  get name() {
    return this.form.get('name');
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.styleId) {
        this.styleService.updateStyle(this.toFormData(this.form.value), this.styleId).subscribe(resp => {
          if (resp.status === 200) {
            this.router.navigate(['/admin/styles']);
          }
        })
      } else {
        this.styleService.saveStyle(this.toFormData(this.form.value)).subscribe(resp => {
          if (resp.status === 201) {
            this.router.navigate(['/admin/styles']);
          }
          if (resp.status === 200) {
            this.form.get('name').setErrors({ exist: true });
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
    if (this.styleId) {
      formData.append('_method', 'PUT');
    }
    return formData;
  }
}
