import {Component, OnInit, ViewChild} from '@angular/core';
import {App} from '../../app/app';
import {AppService} from '../../services/app.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {UploadImageComponent} from '../upload-image/upload-image.component';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent implements OnInit {
  apps: App[];
  displayedColumns: string[] = ['name', 'domain', 'version', 'actions'];
  dataSource = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private  appService: AppService,
              private router: Router,
              private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getApps();
    this.dataSource = new MatTableDataSource<App>(this.apps);
    this.dataSource.paginator = this.paginator;
  }

  updateApp(id: any) {
    this.router.navigate(['update-app', id]);

  }

  deleteApp(id: any) {
    this.appService.deleteApp(id).subscribe(data => {
      this.getApps();
    }, error => {
    });
  }

  appDetails(id: any) {
    this.router.navigate(['app-details', id]);
  }

  private getApps() {
    this.appService.getAppsList().subscribe(data => {
      this.apps = data;
    });
  }

  uploadFile(appId: number) {
    this.router.navigate(['upload-file', appId]);

  }

  uploadImage(appId: number) {
      this.dialog.open(UploadImageComponent, {data: {appId, action: 'add'}});
  }
}
