import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../services/user/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup;
    invalidLogin: boolean;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            pass: ['', Validators.compose([Validators.required, Validators.minLength(1)])]
        });
    }

    onLoginButton() {
        if (this.loginForm.valid) {
            const email = this.loginForm.getRawValue().email;
            const password = this.loginForm.getRawValue().pass;
            this.authService.login(email, password).then(
                successs => {
                    this.invalidLogin = false;
                    this.router.navigateByUrl('/home');
                },
                rejected => {
                    const snack = this.snackBar.open('Login Failed. Please try again');
                    setTimeout(() => {
                        snack.dismiss();
                    }, 3500);
                }
            );
        } else {
            console.error('invalid login');
        }
    }
}
