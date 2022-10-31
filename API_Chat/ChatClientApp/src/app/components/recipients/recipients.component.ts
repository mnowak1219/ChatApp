import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.css']
})
export class RecipientsComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit() {
    this.appService.getAllUsers();
    var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

    connection.on("UserCreated", ()=>{
      this.appService.getAllUsers();
    })
    connection.start();
  }
}
