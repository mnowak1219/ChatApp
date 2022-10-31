
import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit() {
    this.appService.userLoginDto.email = '';
    this.appService.userLoginDto.password = '';
  }
}
