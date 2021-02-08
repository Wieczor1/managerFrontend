import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {LoginService} from './login.service';

@Injectable({
  providedIn: 'root'
})
export class IdGuardService {

  constructor(public loginService: LoginService) { }

  canActivate(route: ActivatedRouteSnapshot,
              ): boolean {

    return !(this.loginService.getId() !== route.paramMap.get('id') && this.loginService.getAuthorities() === 'ROLE_USER');

  }
}
