import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SessionInterceptorService } from './services/user/session-interceptor.service';
import { ColumnComponent } from './components/column/column.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, ColumnComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: SessionInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
