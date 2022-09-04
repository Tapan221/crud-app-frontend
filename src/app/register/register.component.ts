import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from '../enum/header-type-enum';
import { NotificationType } from '../enum/notification-enum';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private router:Router,private authenticationService:AuthenticationService, 
    private notificationService:NotificationService) { }

  ngOnInit(): void {
    if(this.authenticationService.isUserLoggedIn()){
      this.router.navigateByUrl('/home');
    }
   
  }
  ngOnDestroy(){
    this.subscriptions.forEach(sub=> sub.unsubscribe());
  }

  onRegister(user:User):void{
    this.showLoading = true;
    console.log(user);
    this.subscriptions.push(
      this.authenticationService.register(user).subscribe(
        response=>{
          this.showLoading = false;
          this.notificationService.notify(NotificationType.SUCCESS,`A new account has been cretaed for ${response.firstName}.
          Please check your mail for password to login`);
          
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
