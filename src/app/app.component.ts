import {Component, OnInit} from '@angular/core';
import {FileService} from './services/file.service';
import {MatDialog} from '@angular/material/dialog';
import {ImportComponent} from './components/import/import.component';
import {LoginService} from './services/login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Manager';
  url: any;



  constructor(private fileService: FileService,
              private dialog: MatDialog,
              public loginService: LoginService
  ) {
    this.url = fileService.exportDataUrl();
  }

  ngOnInit(): void {
    }


  import() {
    this.dialog.open(ImportComponent);
  }

  logout() {
    this.loginService.logout();
  }
}
