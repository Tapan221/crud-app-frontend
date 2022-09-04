import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationType } from './enum/notification-enum';
import { AuthenticationService } from './service/authentication.service';
import { NotificationService } from './service/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router,
    private notificationService: NotificationService){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }


  isUserLoggedIn():boolean{
    if(this.authenticationService.isUserLoggedIn()){
      return true;
    }else{
      this.router.navigate(['/login']);
      //TODO send notification
      this.notificationService.notify(NotificationType.ERROR,`Yo need to login to access the Page`);

      return false;
    }
  }
  
}
