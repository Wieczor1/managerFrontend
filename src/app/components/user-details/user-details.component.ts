import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../user/user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {UserFiles} from '../../user-files/user-files';
import {AppService} from '../../services/app.service';
import {FileService} from '../../services/file.service';
import {App} from '../../app/app';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  @ViewChild('lineChart', {static: true}) private chartRef;
  id: number;
  user: User;
  userFiles: UserFiles[];
  appNames: Map<number, string> = new Map();
  url: string;
  userApps: App[];
  chart: Chart;


  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private appService: AppService,
              private fileService: FileService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.url = this.router.url;
    this.id = this.route.snapshot.params.id;
    this.user = new User();
    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
    }, error => {
      console.log(error);
    });



    this.appService.getAppsByUserId(this.id).subscribe(data => {
      this.userApps = data;
      this.getUserFiles();


    }, error => {});




  }
  getUserFiles(){
    this.userService.getUsersFileListById(this.id).subscribe(data => {
      this.appNames = new Map();
      this.userFiles = data;
      this.initializeChart();

      console.log(data);
      data.forEach(value => {
        this.appService.getAppById(value.app.id).subscribe(
          data => {
            this.appNames.set(data.id, data.name);
          }
        );
      });
    }, error => {
      console.log(error);
    });
  }

  deleteUserFile(userFile: UserFiles) {
    console.log(userFile);
    let id: any = userFile.user.id;
    if (userFile.user.id === undefined){
       id = userFile.user;
    }
    this.fileService.deleteFileByUserIdAndAppId(id, userFile.app, userFile.id).subscribe(data => {
      console.log(data);
      this.getUserFiles();
    }, error => {
      console.log(error)
    });
  }

  deleteApp(userApp: App) {
  this.userService.deleteAppUser(userApp.id, this.id).subscribe(data => {
    this.appService.getAppsByUserId(this.id).subscribe(data => {
      this.userApps = data;
      this.initializeChart();
    }, error => {});
  }, error => {});
  }

  private initializeChart() {
    new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Number of user\'s apps', 'Number of user\'s files'],
        datasets: [{
          data: [this.userApps.length, this.userFiles.length],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
          ],
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
