import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [RegisterComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule]
})
export class RegisterModule {}
