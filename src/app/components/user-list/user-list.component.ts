import {Component, OnInit} from '@angular/core';
import {User} from '../../user/user';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {SelectAppComponent} from '../select-app/select-app.component';
import {AppService} from '../../services/app.service';
import {App} from '../../app/app';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[];
  apps: App[] = [];

  constructor(private userService: UserService,
              private appService: AppService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  private getUsers() {
    this.userService.getUsersList().subscribe(data => {
      this.users = data;
    });
  }

  updateUser(id: number) {
    this.router.navigate(['update-user', id]);
  }


  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
      console.log(data);
      this.getUsers();
    });

  }

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
}
