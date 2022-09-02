import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticPageModule } from './statistic-page/statistic-page.module';
import { LoginPageModule } from './login-page/login-page.module';
import { ErrorPageModule } from './error-page/error-page.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StatisticPageModule,
    LoginPageModule,
    ErrorPageModule,
  ]
})
export class PagesModule { }
