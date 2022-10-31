import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConversationDto } from '../shared/models/conversation-dto';
import { DisplayUserDto } from '../shared/models/display-user-dto';
import { MessageDto } from '../shared/models/message-dto';
import { UserLoginDto } from '../shared/models/user-login-dto';
import { UserRegisterDto } from '../shared/models/user-register-dto';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  message = new MessageDto();
  messagesList: Array<MessageDto>;
  usersList: Array<DisplayUserDto> = [];
  currentUserFirstName: string = null;
  currentUserLastName: string = null;
  recipientFirstName: string = null;
  recipientLastName: string = null;
  recipient: string;
  userLoginDto = new UserLoginDto();
  userRegisterDto = new UserRegisterDto();
  error: number;

  constructor(private httpService: HttpService, private router: Router) {
    this.message.emailSending = 1;
  }

  getCurrentUser() {
    this.httpService.getCurrentUser().subscribe({
      next: user => {
        this.error = 0;
        this.currentUserFirstName = (user as any).firstName,
          this.currentUserLastName = (user as any).lastName,
          this.recipientFirstName = this.currentUserFirstName,
          this.recipientLastName = this.currentUserLastName,
          this.message.author = this.currentUserFirstName + " " + this.currentUserLastName
      },
      error: HttpErrorResponse => this.error = HttpErrorResponse.status
    });
  }

  getRecipient(event: any) {
    this.error = 0;
    this.recipientFirstName = this.recipient[0].split(';')[0];
    this.recipientLastName = this.recipient[0].split(';')[1];
    this.message.recipient = this.recipientFirstName + " " + this.recipientLastName;
    this.message.recipientEmail = this.recipient[0].split(';')[2];
    this.getMessages();
  }

  getMessages() {
    var conversation = new ConversationDto();
    conversation.firstNameAuthor = this.currentUserFirstName;
    conversation.lastNameAuthor = this.currentUserLastName;
    conversation.firstNameRecipient = this.recipientFirstName;
    conversation.lastNameRecipient = this.recipientLastName;

    if (conversation.firstNameAuthor != null || conversation.lastNameAuthor != null || conversation.firstNameRecipient != null || conversation.lastNameRecipient != null) {
      this.httpService.getMessages(conversation).subscribe({
        next: messages => {
          this.messagesList = messages,
            this.error = 0
        },
        error: HttpErrorResponse => this.error = HttpErrorResponse.status
      });
    }
    else {
      this.error = 30;
    }
  }

  sendMessage() {
    this.httpService.sendMessage(this.message).subscribe({
      next: () => this.error = 0,
      error: HttpErrorResponse => {
        this.error = HttpErrorResponse.status;
        alert('Błąd wysyłania wiadomości. Spróbuj ponownie.');
      }
    });
    this.message.content = null;
    this.getMessages();
  }

  getAllUsers() {
    this.httpService.getAllUsers().subscribe({
      next: users => this.usersList = users,
      error: HttpErrorResponse => this.error = HttpErrorResponse.status
    });
  }

  register() {
    this.httpService.register(this.userRegisterDto).subscribe({
      next: () => {
        this.getAllUsers();
        this.userRegisterDto.email = '';
        this.userRegisterDto.firstName = '';
        this.userRegisterDto.lastName = '';
        this.userRegisterDto.phoneNumber = '';
        this.userRegisterDto.password = '';
        this.goToLogin();
      },
      error: HttpErrorResponse => {
        this.error = HttpErrorResponse.status;
        alert('Nie udało się zarejestrować nowego użytkownika. Spróbuj ponownie.');
      }
    });
  }

  login() {
    this.httpService.login(this.userLoginDto).subscribe({
      next: () => {
        this.router.navigate(['/chat']);
        this.userLoginDto.email = '';
        this.userLoginDto.password = '';
      },
      error: HttpErrorResponse => {
        this.error = HttpErrorResponse.status;
        alert('Nie udało się zalogować. Spróbuj ponownie.');
      }
    });
  }

  logout() {
    this.httpService.logout().subscribe({
      next: () => this.goToLogin(),
      error: HttpErrorResponse => this.error = HttpErrorResponse.status
    });
  }

  goToRegister() {
    this.router.navigate(['/register'])
  }

  goToLogin() {
    this.router.navigate(['/login'])
  }
}
