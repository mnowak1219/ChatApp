import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) { }
  cookie: string;
  isLoggedIn() {
    this.cookie = this.cookieService.get('chat-cookie');
    if (this.cookie != '') {
      return true;
    }
    else {
      return false;
    }
  }
}
