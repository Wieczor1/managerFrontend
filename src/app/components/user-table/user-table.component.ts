import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {User} from '../../user/user';
import {UserService} from '../../services/user.service';
import {SelectAppComponent} from '../select-app/select-app.component';
import {App} from '../../app/app';
import {MatDialog} from '@angular/material/dialog';
import {AppService} from '../../services/app.service';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<User>;
  dataSource = new MatTableDataSource<User>();
  data: User[];
  apps: App[] = [];


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['firstName', 'lastName', 'username', 'email', 'actions'];
  isLoading = true;
  constructor(private userService: UserService,
              private appService: AppService,
              public loginService: LoginService,
              private router: Router,
              private dialog: MatDialog) {
  }


  ngOnInit(): void {
    if (this.loginService.getAuthorities() === 'ROLE_ADMIN')
    {
      this.getUsers();
    }
    else if (this.loginService.getAuthorities() === 'ROLE_USER') {
      this.getUser();
    }

  }

  updateUser(id: number) {
    this.router.navigate(['update-user', id]);
  }

  private getUsers() {
    this.userService.getUsersList().subscribe(data => {
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.data = data;
      this.dataSource.data = data;
      this.isLoading = false;
    });
  }


  deleteUser(id: number) {
    if (this.loginService.getAuthorities() === 'ROLE_USER'){
      this.userService.deleteUser(id).subscribe(data => {
        this.loginService.logout();
        this.router.navigate(['login'])
      }, error => {console.log(error)});
    }
    else if (this.loginService.getAuthorities() === 'ROLE_ADMIN') {
    this.userService.deleteUser(id).subscribe(data => {
      console.log(data);
      this.getUsers();
    });
    }
  } //todo zle haslo powinno dac blad na stronce

  userDetails(id: number) {
    this.router.navigate(['user-details', id]);
  }

  uploadFile(userId: number) {
    this.appService.getAppsByUserId(userId).subscribe(data => {
      this.apps = data;
      this.dialog.open(SelectAppComponent, {data: {apps: this.apps, userId}});
    }, error => {
      console.log(error);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getUser() {
    const id = this.loginService.getId();
    this.userService.getUserById(Number(id)).subscribe(data => {
      setTimeout(() => this.dataSource.paginator = this.paginator);
      this.data = [data];
      this.dataSource.data = [data];
      this.isLoading = false;

    });
  }
}
