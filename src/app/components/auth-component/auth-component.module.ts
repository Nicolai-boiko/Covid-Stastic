import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponentComponent } from './auth-component.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [AuthComponentComponent],
  imports: [
    CommonModule,
    MatButtonModule,
  ]
})
export class AuthComponentModule { }
