import { CookieService } from 'ngx-cookie-service';
import { ConfigComponent } from './../components/config/config.component';
import { AppService } from './../services/app.service';
import { MessageComponent } from './../components/message/message.component';
import { UserInfoComponent } from './../components/user-info/user-info.component';
import { MessageHistoryComponent } from './../components/message-history/message-history.component';
import { LogoutComponent } from './../components/logout/logout.component';
import { ChatComponent } from './../components/chat/chat.component';
import { AppComponent } from './../components/app/app.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { HttpService } from '../services/http.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipientsComponent } from '../components/recipients/recipients.component';
import { AuthGuard } from '../shared/security/auth.guard';
import { AuthUserGuard } from '../shared/security/auth.signup.guard';
import { SortedPipe } from '../pipes/sorted.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ConfigComponent,
    LoginComponent,
    LogoutComponent,
    MessageComponent,
    MessageHistoryComponent,
    RecipientsComponent,
    RegisterComponent,
    UserInfoComponent,
    SortedPipe
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'register', component: RegisterComponent},
      {path: 'login', component: LoginComponent},
      {path: 'chat', component: ChatComponent},
    ]),
  ],
  providers: [
    HttpService,
    AppService,
    AuthGuard,
    AuthUserGuard,
    CookieService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
