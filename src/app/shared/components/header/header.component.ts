import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  form: FormGroup;

  constructor(
      private router: Router,
      private authService: AuthService,
      private formBuilder: FormBuilder
  ) {
      this.authService.currentUser.subscribe(x => this.currentUser = x); 
  }

  redirectTo(uri, param){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri, param]));
 }

  ngOnInit() {
    this.form = this.formBuilder.group({      
      search: []
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    let searchString = this.form.value.search;    
    this.redirectTo('/search', searchString);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
}

}
