import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEnum } from 'src/app/constants/API';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(
    private http: HttpClient,
  ) { }

  getCases(): Observable<any> {
    return this.http.get(`${ApiEnum.BASE}cases`);
  }

  getVaccines(): Observable<any> {
    return this.http.get(`${ApiEnum.BASE}vaccines`);
  }

  getConfirmedCases(inputValue: string): Observable<any> {
    return this.http.get(`${ApiEnum.BASE}history?country=${inputValue}&status=confirmed`);
  }
}
