import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
import { NotificationModule } from './notification.module';
import { NotificationService } from './service/notification.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LogoutComponent } from './logout/logout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { StudentComponent } from './student/student.component';
import { AddStudentsComponent } from './add-students/add-students.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    LogoutComponent,
    HeaderComponent,
    FooterComponent,
    StudentComponent,
    AddStudentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NotificationModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  providers: [NotificationService,AuthGuard, AuthenticationService, UserService,
  {provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
