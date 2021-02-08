import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {AppService} from '../../services/app.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {User} from '../../user/user';
import {App} from '../../app/app';
import {UploadImageComponent} from '../upload-image/upload-image.component';
import {LoginUser} from '../../login-user/login-user';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss']
})
export class AppTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<App>;
  dataSource = new MatTableDataSource<App>();
  data: App[];

  displayedColumns = ['name', 'domain', 'version', 'actions'];
  isLoading = true;
  constructor(private userService: UserService,
              private appService: AppService,
              private router: Router,
              public loginService: LoginService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getApps();
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
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.data = data;
      this.dataSource.data = data;
      this.isLoading = false;
    });
  }

  uploadFile(appId: number) {
    this.router.navigate(['upload-file', appId]);

  }

  uploadImage(appId: number) {
    this.dialog.open(UploadImageComponent, {data: {appId, action: 'add'}});
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
