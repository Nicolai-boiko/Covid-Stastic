import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiEnum } from 'src/app/constants/API';

@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.scss']
})
export class AuthComponentComponent implements OnInit, OnDestroy {


  private destroy$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.http.post('http://localhost:5000/authenticate',
      {
        code: this.route.snapshot.queryParams['code'],
      }
    ).pipe(
      takeUntil(this.destroy$),
    ).subscribe(authToken => console.log(authToken));
  }

}
