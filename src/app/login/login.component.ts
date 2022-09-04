import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from '../enum/header-type-enum';
import { NotificationType } from '../enum/notification-enum';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit , OnDestroy{
  showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private router:Router,private authenticationService:AuthenticationService, 
    private notificationService:NotificationService) { }

  ngOnInit(): void {
    if(this.authenticationService.isUserLoggedIn()){
      this.router.navigateByUrl('/home');
    }
    else{
      this.router.navigateByUrl('/login');
    }

  }
  ngOnDestroy(){
    this.subscriptions.forEach(sub=> sub.unsubscribe());
  }

  onLogin(user:User):void{
    this.showLoading = true;
    console.log(user);
    this.subscriptions.push(
      this.authenticationService.login(user).subscribe(
        response=>{
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token!);
          if(response.body)
          this.authenticationService.addUserToLocalStorage(response.body);
          this.router.navigateByUrl('/home');
          this.showLoading = false;
        },
        errorResponse=>{
          console.log(errorResponse);
          this.errorNotification(NotificationType.ERROR,errorResponse.error.message);
          this.showLoading = false;

        }
      )
    );

  }
  errorNotification(ERROR: NotificationType, message: any) {
    if(message){
      this.notificationService.notify(ERROR,message);

    }
    else{
      this.notificationService.notify(ERROR,'SOME ERROR OCCOURED , PLEASE TRY AGAIN');
    }
  }

}
