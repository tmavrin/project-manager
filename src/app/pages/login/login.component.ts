import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './../../services/user/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      pass: ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    });
  }

  ngOnInit() {}

  onLoginButton() {
    if (this.loginForm.valid) {
      const email = this.loginForm.getRawValue().email;
      const password = this.loginForm.getRawValue().pass;
      this.authService.login(email, password);
    } else {
      console.log('invalid login');
    }
  }
}
