
import { PasswordReset } from '../model/passwordForm';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { User } from '../model/user';
import { NotificationType } from '../enum/notification-type.enum';
import { HeaderType } from '../enum/header-type.enum';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public showLoading: boolean;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private notificationService: NotificationService, private userService:UserService ) {}

  ngOnInit(): void {
   
  }

  public reset(formData:PasswordReset): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.userService.passwordReset(formData).subscribe(
        (response) => {
          this.sendErrorNotification(NotificationType.SUCCESS, `RESET PASSWORD SUCCESSFUL`);
          this.showLoading = false;
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }

  private sendErrorNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  

}
