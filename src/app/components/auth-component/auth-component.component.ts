import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.http.post(ApiEnum.SERVER,
      {
        code: this.route.snapshot.queryParams['code'],
      }
    ).pipe(
      takeUntil(this.destroy$),
    ).subscribe(authToken => {
      sessionStorage.setItem('authToken', authToken as string);
      this.router.navigate(['/statistic']);
    });
  }

  backToLogin(): void {
    this.router.navigate(['/login']);
  }
}
