import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../user/user';
import {LoginUser} from '../login-user/login-user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl = 'http://localhost:8080/api';
  authenticated = false;
  authority = '';

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  login(headers: HttpHeaders, params: HttpParams) {
    console.log(params, 'params');
    console.log(headers, 'headers');
    return this.httpClient.post<any>(`${this.baseUrl}/login`, params, {headers, withCredentials: true});

  }
  isAuthenticated(){
    return localStorage.getItem('authenticated');
  }
  getAuthorities(){
    return localStorage.getItem('authority');
  }

  getId(){
    return localStorage.getItem('id');
  }

  logout() {
    return this.httpClient.post<any>(`${this.baseUrl}/logout`, {}).subscribe(data => {
      localStorage.removeItem('authenticated');
      localStorage.removeItem('authority');
    }, error => {
      console.log(error);
      localStorage.removeItem('authenticated');
      localStorage.removeItem('authority');
    });

  }
}
