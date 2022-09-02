import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject, filter, takeUntil } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ApiEnum } from 'src/app/constants/API';


interface IFilteredData {
  confirmed: string;
  recovered: string;
  deaths: string;
  vaccinated: string;
  newCases: string;
  lastUpdateDate: string;
}

@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss']
})

export class StatisticPageComponent implements OnInit, OnDestroy {

  public countriesList$ = new BehaviorSubject(['']);
  public filteredData$ = new BehaviorSubject({} as IFilteredData);
  public fullStat: any = {};
  public authToken: string = '';
  public vaccinesStat: any = {};
  public loader: boolean = true;
  public toDay: Date = new Date();
  public countries = new FormControl('');
  private destroy$ = new Subject<void>();

  constructor(
    private http: HttpClient,
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.http.get(`${ApiEnum.BASE}cases`).pipe(
      takeUntil(this.destroy$),
    ).subscribe(res => {
      this.countriesList$.next(Object.keys(res));
      this.fullStat = res;
    });

    this.http.get(`${ApiEnum.BASE}vaccines`).pipe(
      takeUntil(this.destroy$),
    ).subscribe(res => {
      this.vaccinesStat = res;
    });

    if (Object.keys(this.fullStat) && Object.keys(this.vaccinesStat)) {
      this.loader = false;
    };

    this.countries.valueChanges.pipe(
      filter(Boolean),
      takeUntil(this.destroy$),
    ).subscribe(inputValue => {
      this.loader = true;

      let selectedCountryStat: IFilteredData = {} as IFilteredData;

      this.http.get(`${ApiEnum.BASE}history?country=${inputValue}&status=confirmed`).pipe(
        takeUntil(this.destroy$),
      ).subscribe((res: any) => {
        const lastUpdateDate = Object.keys(res.All.dates).reduce((a, b) => a > b ? a : b);
        selectedCountryStat.newCases = res.All.dates[lastUpdateDate];
        selectedCountryStat.lastUpdateDate = lastUpdateDate;
        this.loader = false;
      });

      for (let k in this.fullStat) {
        if (k === inputValue) {
          selectedCountryStat.confirmed = this.fullStat[k].All.confirmed;
          selectedCountryStat.recovered = this.fullStat[k].All.recovered;
          selectedCountryStat.deaths = this.fullStat[k].All.deaths;
        }
      }
      for (let x in this.vaccinesStat) {
        if (x === inputValue) {
          selectedCountryStat.vaccinated = this.vaccinesStat[x].All.people_vaccinated && this.vaccinesStat[x].All.population ?
            `${Math.round(this.vaccinesStat[x].All.people_vaccinated / this.vaccinesStat[x].All.population * 100)}%` :
            '';
        }
      }
      this.filteredData$.next(selectedCountryStat);
    });
  }
}
