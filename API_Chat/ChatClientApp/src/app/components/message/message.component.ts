import { AppService } from './../../services/app.service';
import { Component, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit() {
    var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

    connection.on("SendMessage", ()=>{
      this.appService.getMessages();
    })
    connection.start();
  }
}
