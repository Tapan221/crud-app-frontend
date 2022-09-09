import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedInUser: boolean | undefined;

  constructor(public authService:AuthenticationService, private router:Router) { 
   
  }


  ngOnInit(): void {
   this.isLoggedInUser=  this.authService.isUserLoggedIn();
  }

  logoutCall(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
