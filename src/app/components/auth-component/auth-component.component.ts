import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { StatisticService } from 'src/app/services/statistic.service';
@Component({
  selector: 'app-auth-component',
  templateUrl: './auth-component.component.html',
  styleUrls: ['./auth-component.component.scss']
})
export class AuthComponentComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private statisticService: StatisticService,
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParams['error']) {
      this.router.navigate(['/error']);
    } else if (this.route.snapshot.queryParams['code']) {
      this.statisticService.getAuthToken(this.route.snapshot.queryParams['code']).pipe(
        takeUntil(this.destroy$),
      ).subscribe(authToken => {
        sessionStorage.setItem('authToken', authToken as string);
        this.router.navigate(['/statistic']);
      });
    }
  }
}
