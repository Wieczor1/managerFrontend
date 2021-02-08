import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {App} from '../../app/app';

@Component({
  selector: 'app-select-app',
  templateUrl: './select-app.component.html',
  styleUrls: ['./select-app.component.scss']
})
export class SelectAppComponent implements OnInit {
  appId: number;
  userId: number;
  apps: App[] = [];
  selectedApp: App;
  constructor(private dialogRef: MatDialogRef<SelectAppComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router: Router,
              ) {
  }

  ngOnInit(): void {
    this.apps = this.data.apps;
    this.userId = this.data.userId;
    this.selectedApp = this.data.apps[0];
  }

  close() {
    this.dialogRef.close();
  }

  selectAppAndRedirect(app: App) {
    this.router.navigate(['upload-file', app.id, 'user', this.userId]);
    this.close();
  }


}
