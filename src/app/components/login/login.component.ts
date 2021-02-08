import { Component, OnInit } from '@angular/core';
import {LoginUser} from '../../login-user/login-user';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {LoginService} from '../../services/login.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUser: LoginUser;
  form: FormGroup;
  invalid: boolean;

  constructor(private httpClient: HttpClient,
              private loginService: LoginService,
              private router: Router,
             ) { }

  ngOnInit(): void { // todo to samo dla appek i usera tabla w sensie
    this.loginUser = new LoginUser();
    this.form = new FormGroup({
     username: new FormControl(this.loginUser.login, [Validators.required]),
      password: new FormControl(this.loginUser.password, [Validators.required]),
    });
  }
  get username() { return this.form.get('username'); }
  get password() { return this.form.get('password'); }

   async login() {
    this.loginUser.login = this.form.value.username;
    this.loginUser.password = this.form.value.password;
    let header = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();

    header = header.set('Accept', '/*/');
    body = body.set('login', this.loginUser.login);
    body = body.set('password', this.loginUser.password);

    this.loginService.login(header, body).subscribe(data => {
      console.log(data)
      console.log(data[0][0].authority)
      console.log(data[1])
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('authority', data[0][0].authority);
        localStorage.setItem('id', data[1].toString());
        this.redirect();
      },
      error => {
          this.invalid = true;

      });


  }
  redirect(){
    if(this.loginService.isAuthenticated()==='true') this.router.navigate(['users']);
  }

}

