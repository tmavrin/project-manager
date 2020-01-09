import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/user/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    invalidRegister: boolean;

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {
        this.registerForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            pass: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            name: ['', Validators.required]
        });
    }

    ngOnInit() {}

    onRegisterButton() {
        if (this.registerForm.valid) {
            const email = this.registerForm.getRawValue().email;
            const password = this.registerForm.getRawValue().pass;
            const name = this.registerForm.getRawValue().name;
            this.authService.register(email, password, name).then(
                successs => {
                    this.invalidRegister = false;
                    const snack = this.snackBar.open('Register Successful');
                    setTimeout(() => {
                        snack.dismiss();
                        this.router.navigateByUrl('/login');
                    }, 1500);
                },
                rejected => {
                    this.invalidRegister = true;
                    const snack = this.snackBar.open('Register Failed');
                    setTimeout(() => {
                        snack.dismiss();
                    }, 1500);
                }
            );
        } else {
            console.error('Invalid Register');
            const snack = this.snackBar.open('Register Failed');
            setTimeout(() => {
                snack.dismiss();
            }, 5000);
        }
    }
}
