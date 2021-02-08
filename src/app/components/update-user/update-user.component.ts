import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../user/user';
import {ActivatedRoute, Router} from '@angular/router';
import {App} from '../../app/app';
import {AppService} from '../../services/app.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  constructor(private userService: UserService,
              private appService: AppService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  user: User = new User();
  id: number;
  selectedApp: App;
  apps: App[];
  form: FormGroup;
  userApps: App[];


  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.appService.getAppsByUserId(this.id).subscribe(data => {
      this.userApps = data;
      this.appService.getAppsList().subscribe(data => {
        this.apps = data;
        this.apps = this.apps.filter(x => !this.userApps.filter(y => y.id === x.id).length);
        this.selectedApp = this.apps[0];
      }, error => {
        console.log(error);
      });
    }, error => {console.log(error)});
    this.userService.getUserById(this.id).subscribe(data => {
      this.user = data;
      console.log(this.user);
      this.form = new FormGroup({
        firstName: new FormControl(this.user.firstName, [Validators.required]),
        lastName: new FormControl(this.user.lastName, [Validators.required]),
        email: new FormControl(this.user.email, [Validators.required, Validators.email, Validators.pattern('^[^\\s@]+@([^\\s@.,]+\\.)+[^\\s@.,]{2,}$')]),
        username: new FormControl(this.user.username, [Validators.required]),
        selected: new FormControl(this.apps, []),
      });
      this.form.patchValue(this.user);
      this.form.setValue({selected: this.apps});

    }, error => {
      console.log(error);
    });
  }

    get firstName() { return this.form.get('firstName'); }
    get lastName() { return this.form.get('lastName'); }
    get email() { return this.form.get('email'); }
    get username() { return this.form.get('username'); }
    get selected() { return this.form.get('selected'); }

  goToUserList() {
    this.router.navigate(['/users']);

  }

  onSubmit() {
    this.user.username = this.form.value.username;
    this.user.email = this.form.value.email;
    this.user.firstName = this.form.value.firstName;
    this.user.lastName = this.form.value.lastName;
    this.selectedApp = this.form.value.selected;
    this.userService.updateUser(this.id, this.user).subscribe(data => {
      if (this.selectedApp) {
        this.userService.createAppUser(this.selectedApp.id, this.id).subscribe(data => {

        }, error => {
          console.log(error);
        });
      }
      this.goToUserList();

      }, error => {
        console.log(error);
      }
    );
  }
}
