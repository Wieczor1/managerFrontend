import { Injectable } from '@angular/core';
import {LoginService} from './login.service';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public loginService: LoginService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data.expectedRoles;
    console.log(route.data.expectedRoles);
    if (this.loginService.isAuthenticated() !== 'true' || !expectedRoles.includes(this.loginService.getAuthorities())) {
      console.log('odrzucilem');
      return false;
    }
    return true;
  }


}
