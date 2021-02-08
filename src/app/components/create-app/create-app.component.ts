import {Component, OnInit} from '@angular/core';
import {App} from '../../app/app';
import {AppService} from '../../services/app.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-app',
  templateUrl: './create-app.component.html',
  styleUrls: ['./create-app.component.scss']
})
export class CreateAppComponent implements OnInit {
  app: App = new App();
  form: FormGroup;


  constructor(private appService: AppService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.app.name, [Validators.required]),
      domain: new FormControl(this.app.domain, [Validators.required, Validators.pattern('^((?:https?:\\/\\/)?[^./]+(?:\\.[^./]+)+(?:\\/.*)?)$')]),
      version: new FormControl(this.app.version, [Validators.required, Validators.pattern('^(\\d+\\.)?(\\d+\\.)?(\\*|\\d+)$')]),
    });
  }

  get name() { return this.form.get('name'); }
  get domain() { return this.form.get('domain'); }
  get version() { return this.form.get('version'); }


  saveApp() {
    this.app.version = this.form.value.version;
    this.app.name = this.form.value.name;
    this.app.domain = this.form.value.domain;

    this.appService.createApp(this.app).subscribe(data => {
      console.log(data);
      this.goToAppList();
    }, error => {
      console.log(error);
    });
  }

  goToAppList() {
    this.router.navigate(['/apps']);
  }

  onSubmit() {
    this.saveApp();
  }

}
