import { Component, Input, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent {

  preview: string;

  @Input() photo: FormGroup;
  @Input() photoLink;

  // constructor() {
  //   console.log(this.photoLink);
  //   if(this.photoLink) this.preview = this.photoLink;
  // }

  ngOnChanges(changes: SimpleChanges) {
    // only run when property "data" changed
    if (changes.photoLink && this.photoLink) {
        this.preview = environment.imagesUrl + this.photoLink;
    } else {
      this.preview = environment.imagesUrl + 'placeholder.jpg';
    }
}

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.photo.patchValue({
      photo: file
    });
    this.photo.get('photo').updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
