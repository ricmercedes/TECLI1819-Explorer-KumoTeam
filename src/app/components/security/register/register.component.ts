import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslatableComponent } from '../../translatable/translatable.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends TranslatableComponent implements OnInit {
  registrationForm: FormGroup;
  roleList: string[];
  submitted = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private translateService: TranslateService) {

    super(translateService);
    this.roleList = authService.getRoles();
    this.createForm();

  }

  createForm() {
    this.registrationForm = this.fb.group({
      name: [''],
      surname: [''],
      email: [''],
      password: [''],
      phone: [''],
      address: [''],
      role: [''],
      validated: ['']
    });
  }

  onRegister() {
    this.authService.registerUser(this.registrationForm.value).
      then(res => {
        console.log(res);
        this.router.navigate(['./login']);
      }, err => {
        console.log(err);
      });
  }

  ngOnInit() {
  }

}
