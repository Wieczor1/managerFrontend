import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {UserService} from '../../services/user.service';
import {FileService} from '../../services/file.service';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  @ViewChild('fileChart', {static: true}) private fileChartRef;
  @ViewChild('appsChart', {static: true}) private appsChartRef;
  @ViewChild('extsChart', {static: true}) private extsChartRef;
  @ViewChild('imgsChart', {static: true}) private imgsChartRef;
  chartFiles: Chart;
  userFilesCount: number[];
  chartApps: Chart;
  userAppsCount: number[];
  chartImages: Chart;
  appImagesCount: number[];
  chartExtensions: Chart;
  extensions: string[];
  usernames: string[];
  appNames: string[];


  constructor(private userService: UserService,
              private appService: AppService,
              private fileService: FileService, ) {
  }

  ngOnInit(): void {
    this.userService.getUsersAppStats().subscribe(data => {
      this.userAppsCount = data;
      this.getAppNames();


    }, error => {
    });


  }

  getAppNames() {
    this.appService.getAppsList().subscribe(data => {
      this.appNames = data.map(value => value.name + ' id:' + value.id);
      this.getUsernames();
    }, error => {
    });
  }

  getUserFileStats() {
    this.userService.getUsersFileStats().subscribe(data => {
      this.userFilesCount = data;
      this.getAppImageStats();
    }, error => {
    });
  }

  getUsernames() {
    this.userService.getUsersList().subscribe(data => {
      this.usernames = data.map(value => value.username + ' id:' + value.id);
      this.getUserFileStats();
    }, error => {
    });
  }

  getAppImageStats() {
    this.appService.getAppsImageStats().subscribe(data => {
      this.appImagesCount = data;
      this.getExtensionStats();
    }, error => {
    });
  }

  getExtensionStats() { // INITIALIZE CHARTS, brzydkie
    this.fileService.getFileExtensionsStats().subscribe(data => {
      this.extensions = data.map(value => value.split('.').pop());

      console.log(this.extensions);
      this.initializeFileChart();
      this.initializeAppsChart();
      this.initializeExtsChart();
      this.initializeImagesChart();
    }, error => {
    });
  }

  dynamicColors() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return 'rgba(' + r + ',' + g + ',' + b + ', 0.5)';
  }

  poolColors(a) {
    const pool = [];
    for (let i = 0; i < a; i++) {
      pool.push(this.dynamicColors());
    }
    return pool;
  }

  initializeFileChart() {
    new Chart(this.fileChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.usernames,
        datasets: [{
          data: this.userFilesCount,
          backgroundColor: this.poolColors(this.userFilesCount.length),
          borderColor: this.poolColors(this.userFilesCount.length),
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  initializeImagesChart() {
    new Chart(this.imgsChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.appNames,
        datasets: [{
          data: this.appImagesCount,
          backgroundColor: this.poolColors(this.appImagesCount.length),
          borderColor: this.poolColors(this.appImagesCount.length),
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  initializeAppsChart() {
    new Chart(this.appsChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.usernames,
        datasets: [{
          data: this.userAppsCount,
          backgroundColor: this.poolColors(this.userAppsCount.length),
          borderColor: this.poolColors(this.userAppsCount.length),
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  initializeExtsChart(){
    const set = [...new Set(this.extensions)];
    const map = this.extensions.reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
    const count = set.map(value => map.get(value));
    new Chart(this.extsChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: set,
        datasets: [{
          data: count,
          backgroundColor: this.poolColors(count.length),
          borderColor: this.poolColors(count.length),
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}



