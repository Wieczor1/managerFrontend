import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import {User} from '../../user/user';
import {App} from '../../app/app';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {AppService} from '../../services/app.service';
import {Router} from '@angular/router';
import {$e} from 'codelyzer/angular/styles/chars';
import {BehaviorSubject, Subject} from 'rxjs';
import {HttpHeaders, HttpParams} from '@angular/common/http';
import {LoginUser} from '../../login-user/login-user';
import {LoginService} from '../../services/login.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = new User();
  apps: App[];
  // selectedApp: App;
  form: FormGroup;
  strength = 0;
  invalidUsername = false;
  loginUser: LoginUser = new LoginUser();


  constructor(private userService: UserService,
              private appService: AppService,
              private router: Router,
              private loginService: LoginService,
              private ref: ChangeDetectorRef,
              ) {
  }

  ngOnInit(): void {
      this.form = new FormGroup({
        firstName: new FormControl(this.user.firstName, [Validators.required]),
        lastName: new FormControl(this.user.lastName, [Validators.required]),
        email: new FormControl(this.user.email, [Validators.required, Validators.email, Validators.pattern('^[^\\s@]+@([^\\s@.,]+\\.)+[^\\s@.,]{2,}$')]),
        username: new FormControl(this.user.username, [Validators.required]),
        password: new FormControl(this.user.password, [Validators.required, Validators.minLength(7), this.strengthValidator().bind(this)]),
      });
  }

   strengthValidator(): ValidatorFn {
      return (control: AbstractControl): {[key: string]: any} | null => {
        console.log('sila w sorku walidacji' + this.strength);
        return this.strength < 1 ? {strengthValidation: {value: control.value}} : null;
      };
    }


  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get email() { return this.form.get('email'); }
  get username() { return this.form.get('username'); }
  // get selected() { return this.form.get('selected'); }
  get password() { return this.form.get('password'); }
  //

  saveUser(e: any) {
    this.user.username = this.form.value.username;
    this.user.email = this.form.value.email;
    this.user.firstName = this.form.value.firstName;
    this.user.lastName = this.form.value.lastName;
    this.user.password = this.form.value.password;
    console.log(this.user);
    this.userService.checkIfUsernameExists(this.user.username).subscribe(data => {
      if (data === true) {
        console.log('tru');
        this.invalidUsername = true;
        this.ref.detectChanges();
        e.preventDefault();
        // return;
      } else {
        this.userService.createUser(this.user).subscribe(data => {
          console.log(data)
          this.login(this.user.username, this.user.password);
            },
            error => {
                console.log(error);

            });
        }}, error => {
          console.log(error);
        });
      }


login(username, password){
    this.loginUser.login = this.form.value.username;
    this.loginUser.password = this.form.value.password;
    let header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();

    header = header.set('Accept', '/*/');
    body = body.set('login', username);
    body = body.set('password', password);

    this.loginService.login(header, body).subscribe(data => {
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('authority', data[0][0].authority);
        localStorage.setItem('id', data[1].toString());
        this.redirect();
      },
      error => {
          console.log(error);
      });


  }
redirect(){
    if (this.loginService.isAuthenticated()) { this.router.navigate(['users']); }
  }




  //
  // goToUserList() {
  //   this.router.navigate(['/users']);
  //
  // }
  //
  // onSubmit() {
  //   this.saveUser();
  // }


changeStrength(strength: number) {
    if (strength !== undefined || strength !== null) {
      console.log('sila przy zmianie' + strength);
      this.strength = strength.valueOf();
      this.password.updateValueAndValidity();
    }
  }
}
