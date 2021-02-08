import {Component, OnInit} from '@angular/core';
import {User} from '../../user/user';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {App} from '../../app/app';
import {AppService} from '../../services/app.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  user: User = new User();
  apps: App[];
  selectedApp: App;
  form: FormGroup;

  constructor(private userService: UserService,
              private appService: AppService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.appService.getAppsList().subscribe(data => {
      this.apps = data;
      this.selectedApp = this.apps[0];
      this.form = new FormGroup({
        firstName: new FormControl(this.user.firstName, [Validators.required]),
        lastName: new FormControl(this.user.lastName, [Validators.required]),
        email: new FormControl(this.user.email, [Validators.required, Validators.email, Validators.pattern('^[^\\s@]+@([^\\s@.,]+\\.)+[^\\s@.,]{2,}$')]),
        username: new FormControl(this.user.username, [Validators.required]),
        selected: new FormControl(this.selectedApp, [Validators.required]),
      });
      this.form.setValue({selected: this.apps[0]});
    }, error => {
      console.log(error);
    });



  }
  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get email() { return this.form.get('email'); }
  get username() { return this.form.get('username'); }
  get selected() { return this.form.get('selected'); }

  saveUser() {
    this.user.username = this.form.value.username;
    this.user.email = this.form.value.email;
    this.user.firstName = this.form.value.firstName;
    this.user.lastName = this.form.value.lastName;
    this.selectedApp = this.form.value.selected;
    console.log(this.selectedApp);
    console.log(this.user);
    this.userService.createUser(this.user).subscribe(data => {
        console.log(data);
        this.userService.createAppUser(this.selectedApp.id, data.id).subscribe(data => {
          this.goToUserList();
        }, error => {
          console.log(error);
        });
      },
      error => console.log(error));
  }

  goToUserList() {
    this.router.navigate(['/users']);

  }

  onSubmit() {
    this.saveUser();
  }
}
