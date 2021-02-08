import {Component, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';
import {ActivatedRoute, Router} from '@angular/router';
import {App} from '../../app/app';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-app',
  templateUrl: './update-app.component.html',
  styleUrls: ['./update-app.component.scss']
})
export class UpdateAppComponent implements OnInit {

  app: App = new App();
  id: number;
  form: FormGroup;

  constructor(private appService: AppService,
              private route: ActivatedRoute,
              private router: Router) {
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.appService.getAppById(this.id).subscribe(data => {
      this.app = data;
      this.form = new FormGroup({
        name: new FormControl(this.app.name, [Validators.required]),
        domain: new FormControl(this.app.domain, [Validators.required, Validators.pattern('^((?:https?:\\/\\/)?[^./]+(?:\\.[^./]+)+(?:\\/.*)?)$')]),
        version: new FormControl(this.app.version, [Validators.required, Validators.pattern('^(\\d+\\.)?(\\d+\\.)?(\\*|\\d+)$')]),
      });
    }, error => {
      console.log(error);
    });
  }

  get name() { return this.form.get('name'); }
  get domain() { return this.form.get('domain'); }
  get version() { return this.form.get('version'); }

  goToAppList() {
    this.router.navigate(['/apps']);
  }

  onSubmit() {
    this.app.version = this.form.value.version;
    this.app.name = this.form.value.name;
    this.app.domain = this.form.value.domain;
    this.appService.updateApp(this.id, this.app).subscribe(data => {
      this.goToAppList();
    }, error => {
      console.log(error);
    });
  }

}
