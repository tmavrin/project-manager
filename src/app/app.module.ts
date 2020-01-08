import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ColumnComponent } from './components/column/column.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SessionInterceptorService } from './services/user/session-interceptor.service';
import { MatDialogModule } from '@angular/material/dialog';
import { TicketDialogComponent } from './dialogs/ticket-dialog/ticket-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { UserSelectionDialogComponent } from './dialogs/user-selection-dialog/user-selection-dialog.component';
import { RegisterComponent } from './pages/register/register.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateBoardDialogComponent } from './dialogs/create-board-dialog/create-board-dialog.component';
import { SelectBoardDialogComponent } from './dialogs/select-board-dialog/select-board-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CookieService } from 'ngx-cookie-service';
import { CreateColumnDialogComponent } from './dialogs/create-column-dialog/create-column-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        ColumnComponent,
        TicketComponent,
        TicketDialogComponent,
        UserSelectionDialogComponent,
        RegisterComponent,
        CreateBoardDialogComponent,
        SelectBoardDialogComponent,
        CreateColumnDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        DragDropModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
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
    entryComponents: [TicketDialogComponent, UserSelectionDialogComponent, CreateBoardDialogComponent, SelectBoardDialogComponent, CreateColumnDialogComponent]
})
export class AppModule {}
