import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  constructor(public appService: AppService) { }

  ngOnInit() {
    this.appService.userRegisterDto.email = '';
    this.appService.userRegisterDto.firstName = '';
    this.appService.userRegisterDto.lastName = '';
    this.appService.userRegisterDto.phoneNumber = '';
    this.appService.userRegisterDto.password = '';
  }


}
