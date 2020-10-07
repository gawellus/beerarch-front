import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'form-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {

  preview: string;

  @Input() photo: FormGroup;

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.photo.patchValue({
      photo: file
    });
    this.photo.get('photo').updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
}
