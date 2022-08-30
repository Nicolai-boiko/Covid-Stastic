
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { LiveAnnouncer } from '@angular/cdk/a11y';


@Component({
  selector: 'app-statistic-page',
  templateUrl: './statistic-page.component.html',
  styleUrls: ['./statistic-page.component.scss']
})


export class StatisticPageComponent implements OnInit, AfterViewInit {

  public countriesList = new BehaviorSubject(['']);
  public fullStat = new BehaviorSubject({});
  public vaccinesStat = new BehaviorSubject({});
  countries = new FormControl('');

  displayedColumns: string[] = ['confirmed', 'recovered', 'deaths', 'vaccinated'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(
    private http: HttpClient,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.http.get('https://covid-api.mmediagroup.fr/v1/cases').subscribe(res => {
      this.countriesList.next(Object.keys(res));
      this.fullStat.next(res);
    });
    this.http.get('https://covid-api.mmediagroup.fr/v1/vaccines').subscribe(res => {
      this.vaccinesStat.next(res);
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
