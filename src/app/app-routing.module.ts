import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { GitAuthComponent } from './components/git-auth/git-auth.component';

const routes: Routes = [
  { path: '', redirectTo: `/login`, pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'statistic', component: StatisticPageComponent },
  {
    path: 'test',
    component: GitAuthComponent,
    resolve: {
      // url: ExtUrlResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
