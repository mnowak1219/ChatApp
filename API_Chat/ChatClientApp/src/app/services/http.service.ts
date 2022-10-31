import { ConversationDto } from '../shared/models/conversation-dto';
import { UserRegisterDto } from '../shared/models/user-register-dto';
import { UserLoginDto } from '../shared/models/user-login-dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageDto } from '../shared/models/message-dto';
import { DisplayUserDto } from '../shared/models/display-user-dto';

@Injectable()
export class HttpService {

  private baseUrl = 'https://localhost:5001/';

  constructor(private http: HttpClient) { }

  register(user: UserRegisterDto): (Observable<UserRegisterDto>) {
    return this.http.post<UserRegisterDto>(this.baseUrl + 'account/register', user);
  }

  login(user: UserLoginDto): (Observable<UserLoginDto>) {
    return this.http.post<UserLoginDto>(this.baseUrl + 'account/login', user);
  }

  logout(): (Observable<any>) {
    return this.http.get<any>(this.baseUrl + 'account/logout');
  }

  getCurrentUser(): (Observable<any>) {
    return this.http.get<any>(this.baseUrl + 'account/getCurrentUser');
  }

  getAllUsers(): (Observable<Array<DisplayUserDto>>) {
    return this.http.get<Array<DisplayUserDto>>(this.baseUrl + 'account/getAllUsers');
  }

  sendMessage(message: MessageDto): (Observable<MessageDto>) {
    return this.http.post<MessageDto>(this.baseUrl + 'chat/sendMessage', message);
  }

  getMessages(conversation: ConversationDto): (Observable<Array<MessageDto>>) {
    return this.http.post<Array<MessageDto>>(this.baseUrl + 'chat/getMessages', conversation);
  }

}
