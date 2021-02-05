import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BeerService } from '@shared/services/beer.service';
import * as _moment from 'moment';
import { take } from 'rxjs/operators';
import { ThemePalette } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { autocompleteValueValidator } from '../../shared/custom-validators/autocomplete-value.validator';

const moment = _moment;

const MY_FORMATS = {
  parse: {
    dateInput: 'l, LTS',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-beer-form',
  templateUrl: './beer-form.component.html',
  styleUrls: ['./beer-form.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
})
export class BeerFormComponent implements OnInit {

  public color: ThemePalette = 'primary';

  public isDisabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private beerService: BeerService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  get name() {
    return this.form.get('name');
  }
  @ViewChild('nameRef') nameRef: ElementRef;
  @ViewChild('picker') picker: any;

  form: FormGroup;
  photoLink: string;
  beerId;
  focusName(): void {
    this.nameRef.nativeElement.scrollIntoView();
  }


  ngOnInit() {
    this.form = this.formBuilder.group({
      breweries: ['', [Validators.required, autocompleteValueValidator]],
      name: ['', Validators.required],
      consumed_on: ['', Validators.required],
      styles: ['', [Validators.required, autocompleteValueValidator]],
      alc: [],
      ekst: [],
      ibu: [],
      description: [],
      notes: [],
      rating: [],
      photo: []
    });

    this.beerId = this.route.snapshot.paramMap.get('id');

    if (this.beerId) {
      this.beerService.getBeerDetails(this.beerId).pipe(take(1)).subscribe((res) => {
        this.form.patchValue({
          name: res.name,
          alc: res.alc,
          ekst: res.ekst,
          ibu: res.ibu,
          description: res.description,
          notes: res.notes,
          rating: res.rating,
          breweries: res.brewery,
          styles: res.style,
          photo: res.photo,
          consumed_on: new Date(res.consumed_on)
        });
        this.photoLink = res.photo;
      });
    }
  }

  onSubmit() {
    // na autoselectach pole może zwracać stringa, jeśli wartość została wpisana z łapy
    // można dodać walidator na obiekt
    if (this.form.valid) {
      this.isDisabled = true;
      if (this.beerId) {
        this.beerService.updateBeer(this.toFormData(this.form.value), this.beerId).subscribe(resp => {
          if (resp.status === 200) {
            this.isDisabled = false;
            this.router.navigate(['/admin/beers']);
          }
       });
      } else {
        this.beerService.saveBeer(this.toFormData(this.form.value)).subscribe(resp => {
          if (resp.status === 201) {
            this.isDisabled = false;
            this.router.navigate(['/admin/beers']);
          }
          if (resp.status === 200) {
            this.isDisabled = false;
            this.form.get('name').setErrors({ exist: true });
            this.focusName();
          }
       });
      }
    }
  }

  toFormData<T>(formValue: T) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      if (value) {
        formData.append(key, value);
      }
    }
    formData.append('brewery_id', this.form.get('breweries').value.id);
    formData.append('style_id', this.form.get('styles').value.id);
    formData.delete('styles');
    formData.delete('breweries');
    formData.delete('photo');

    const consumptionDate = moment(this.form.get('consumed_on').value);    

    if (!this.beerId) {
      let now: Date = new Date();
      consumptionDate.set({hour:now.getHours(),minute:now.getMinutes(),second:0});
    }    

    formData.set('consumed_on', this.datePipe.transform(consumptionDate, 'yyyy-MM-dd HH:mm:ss'));

    const photoFile = this.form.get('photo').value;
    if (photoFile && (typeof photoFile.name === 'string')) {
      formData.append('file', this.form.get('photo').value);
    }
    if (this.beerId) {
      formData.append('_method', 'PUT');
    }

    return formData;
  }
}
