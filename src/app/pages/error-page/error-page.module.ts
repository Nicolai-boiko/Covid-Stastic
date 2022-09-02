import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './error-page.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
  ]
})
export class ErrorPageModule { }
