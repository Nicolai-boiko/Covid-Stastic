import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, filter, takeUntil } from 'rxjs';
import { FormControl } from '@angular/forms';
import { IFilteredData } from 'src/app/constants/interfaces';
import { StatisticService } from 'src/app/services/statistic.service';


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
    private statisticService: StatisticService,
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.statisticService.getCases().pipe(
      takeUntil(this.destroy$),
    ).subscribe(statistic => {
      this.countriesList$.next(Object.keys(statistic));
      this.fullStat = statistic;
    });

    this.statisticService.getVaccines().pipe(
      takeUntil(this.destroy$),
    ).subscribe(vaccinated => {
      this.vaccinesStat = vaccinated;
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

      this.statisticService.getConfirmedCases(inputValue).pipe(
        takeUntil(this.destroy$),
      ).subscribe((confirmedCases: any) => {
        const lastUpdateDate = Object.keys(confirmedCases.All.dates).reduce((a, b) => a > b ? a : b);
        selectedCountryStat.newCases = confirmedCases.All.dates[lastUpdateDate];
        selectedCountryStat.lastUpdateDate = lastUpdateDate;
        this.loader = false;
      });

      for (let country in this.fullStat) {
        if (country === inputValue) {
          selectedCountryStat.confirmed = this.fullStat[country].All.confirmed;
          selectedCountryStat.recovered = this.fullStat[country].All.recovered;
          selectedCountryStat.deaths = this.fullStat[country].All.deaths;
        }
      }

      for (let country in this.vaccinesStat) {
        if (country === inputValue) {
          selectedCountryStat.vaccinated = this.vaccinesStat[country].All.people_vaccinated && this.vaccinesStat[country].All.population ?
            `${Math.round(this.vaccinesStat[country].All.people_vaccinated / this.vaccinesStat[country].All.population * 100)}%` :
            '';
        }
      }

      this.filteredData$.next(selectedCountryStat);
    });
  }
}
