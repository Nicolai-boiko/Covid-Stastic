import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { AuthComponentComponent } from './components/auth-component/auth-component.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: `/login`, pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'statistic', component: StatisticPageComponent, canActivate: [AuthGuard] },
  { path: 'users/auth', component: AuthComponentComponent },
  { path: 'error', component: ErrorPageComponent },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
