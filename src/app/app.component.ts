import { Component } from '@angular/core';
import { AuthService } from './services/user/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Project Manager';
    pageLoaded = false;

    constructor(private auth: AuthService, private router: Router) {
        this.auth.isAuthenticated.subscribe(isAuth => {
            if (isAuth) {
                this.router.navigateByUrl('home', { replaceUrl: true });
            } else {
                this.router.navigateByUrl('login', { replaceUrl: true });
            }
        });
    }
}
