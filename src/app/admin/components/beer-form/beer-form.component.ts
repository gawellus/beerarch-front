import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BeerService } from '@shared/services/beer.service';
import { take } from 'rxjs/operators';
import { autocompleteValueValidator } from '../../shared/custom-validators/autocomplete-value.validator';

@Component({
  selector: 'app-beer-form',
  templateUrl: './beer-form.component.html',
  styleUrls: ['./beer-form.component.css']
})
export class BeerFormComponent implements OnInit {
  form: FormGroup;
  photoLink: string;  
  beerId;

  constructor(
    private formBuilder: FormBuilder, 
    private beerService: BeerService,
    private route: ActivatedRoute,
    private router: Router,
    ) {}


  ngOnInit() {

    this.form = this.formBuilder.group({
      breweries: ['', [Validators.required, autocompleteValueValidator]],
      name: ['', Validators.required],
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

console.log(this.beerId);


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
          photo: res.photo
        });
        this.photoLink = res.photo
      }

      );
      
    } 

    // console.log(this.beer);

    
  }

  onSubmit() {
      //na autoselectach pole może zwracać stringa, jeśli wartość została wpisana z łapy
      //można dodać walidator na obiekt

    if (this.form.valid) {
      if(this.beerId) {
        this.beerService.updateBeer(this.toFormData(this.form.value), this.beerId);
      } else {
        this.beerService.saveBeer(this.toFormData(this.form.value));  
      }      
    }
    this.router.navigate(['/admin/beers']);
  }

  

  toFormData<T>( formValue: T ) {
    const formData = new FormData();  
    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      formData.append(key, value);
    }
    formData.append('brewery_id', this.form.get('breweries').value.id)
    formData.append('style_id', this.form.get('styles').value.id)
    formData.delete('styles');
    formData.delete('breweries');
    formData.delete('photo');
    const photoFile = this.form.get('photo').value;
    if (typeof photoFile.name == 'string') {
      formData.append('file', this.form.get('photo').value);
    }
    if(this.beerId) {
      formData.append('_method', 'PUT');
    }
    return formData;
  }
}
