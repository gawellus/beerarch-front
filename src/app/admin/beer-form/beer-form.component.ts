import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { autocompleteValueValidator } from './custom-validators/autocomplete-value.validator';
import { Beer } from 'src/app/beer';
import { BeerService } from 'src/app/beer.service';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-beer-form',
  templateUrl: './beer-form.component.html',
  styleUrls: ['./beer-form.component.css']
})
export class BeerFormComponent implements OnInit {
  form: FormGroup;
  photoLink: string;  

  constructor(
    private formBuilder: FormBuilder, 
    private beerService: BeerService,
    private route: ActivatedRoute
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

    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.beerService.getBeerDetails(id).pipe(take(1)).subscribe((res) => {        
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
      this.beerService.saveBeer(this.toFormData(this.form.value));
    }
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
    formData.append('file', this.form.get('photo').value);
    return formData;
  }
}
