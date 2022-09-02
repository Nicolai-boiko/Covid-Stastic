import { Component } from '@angular/core';
import { ApiEnum } from 'src/app/constants/API';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  login(): void {
    window.location.href = `${ApiEnum.AUTHORIZE}${ApiEnum.CLIENT_ID}`;
  }
  
}
