import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }


  login(): void {
    this.http.get('https://github.com/login/oauth/authorize').subscribe()
  }
}
