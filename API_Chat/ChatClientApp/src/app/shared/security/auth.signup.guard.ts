import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthUserGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){
  }

  canActivate(){
    if(this.authService.isLoggedIn()){
      this.router.navigate(['chat']);
      return false;
    }
    else
    {
      return true;
    }
  }
}
