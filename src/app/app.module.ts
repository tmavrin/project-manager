import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SessionInterceptorService } from './services/user/session-interceptor.service';
import { MatDialogModule } from '@angular/material/dialog';
import { TicketDialogComponent } from './dialogs/ticket-dialog/ticket-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UserSelectionDialogComponent } from './dialogs/user-selection-dialog/user-selection-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateBoardDialogComponent } from './dialogs/create-board-dialog/create-board-dialog.component';
import { SelectBoardDialogComponent } from './dialogs/select-board-dialog/select-board-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CookieService } from 'ngx-cookie-service';
import { CreateColumnDialogComponent } from './dialogs/create-column-dialog/create-column-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AddUserDialogComponent } from './dialogs/add-user-dialog/add-user-dialog.component';
import { HomeModule } from './pages/home/home.module';
import { LoginModule } from './pages/login/login.module';
import { RegisterModule } from './pages/register/register.module';

@NgModule({
    declarations: [
        AppComponent,
        TicketDialogComponent,
        UserSelectionDialogComponent,
        CreateBoardDialogComponent,
        SelectBoardDialogComponent,
        CreateColumnDialogComponent,
        AddUserDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatSelectModule,
        HomeModule,
        LoginModule,
        RegisterModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: SessionInterceptorService,
            multi: true
        },
        CookieService
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        TicketDialogComponent,
        UserSelectionDialogComponent,
        CreateBoardDialogComponent,
        SelectBoardDialogComponent,
        CreateColumnDialogComponent,
        AddUserDialogComponent
    ]
})
export class AppModule {}
