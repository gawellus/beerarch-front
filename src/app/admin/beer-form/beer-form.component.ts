import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-beer-form',
  templateUrl: './beer-form.component.html',
  styleUrls: ['./beer-form.component.css']
})
export class BeerFormComponent implements OnInit {
  form: FormGroup;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      // breweries: ['', Validators.required],
      // name: ['', Validators.required],
      // styles: [],
      // alc: [],
      // ekst: [],
      // ibu: [],
      // description: [],
      // notes: [],
      // rating: [],
      photo: []
    });
  }

  onSubmit() {
      //na autoselectach pole może zwracać stringa, jeśli wartość została wpisana z łapy
      //można dodać walidator na obiekt

    if (this.form.valid) {
      // const name = this.form.get('name').value;
      // const brewery = this.form.get('breweries').value;
      // const brew = this.form.get('styles').value;      
      // console.log(name);
      // console.log(brewery);
      // console.log(brew);
console.log(this.form.value);
    }
  }  
}
