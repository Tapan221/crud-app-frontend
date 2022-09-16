import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './model/user';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public user: User;
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    
  }
  isUserLoggedIn() {
    if (this.authenticationService.isUserLoggedIn()) return true;
    else return false;
  }
}
