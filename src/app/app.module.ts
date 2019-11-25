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
import { TicketDialogComponent } from './components/ticket-dialog/ticket-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { UserSelectionDialogComponent } from './components/user-selection-dialog/user-selection-dialog.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ColumnComponent,
    TicketComponent,
    TicketDialogComponent,
    UserSelectionDialogComponent,
    RegisterComponent
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
    MatNativeDateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [TicketDialogComponent, UserSelectionDialogComponent]
})
export class AppModule {}
