import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEnum } from 'src/app/constants/API';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public apiEnum = ApiEnum;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
}
