import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){
  }

  canActivate(){
    if(this.authService.isLoggedIn()){
      return true;
    }
    else
    {
      alert('Musisz się zalogować, by uzyskać dostęp do aplikacji.')
      this.router.navigate(['login']);
      return false;
    }
  }
}
