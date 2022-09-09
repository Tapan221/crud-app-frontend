import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private host = environment.apiUrl;
  private token: string | undefined |null;
  private helper = new JwtHelperService();
  loggedInUser: string|null|undefined;

  constructor(private http:HttpClient) { }


  logout() {
    this.token=null;
    this.loggedInUser=null;
    localStorage.removeItem('user');
    localStorage.removeItem('users');
    localStorage.removeItem('token');
  }

  login(user:User): Observable<HttpResponse<User>>{
    return this.http.post<User>(`${this.host}/user/login`,user,{observe:'response'});

  }

  register(user:User): Observable<any>{
    return this.http.post(`${this.host}/user/register`,user,{observe:'response'});

  }

  public saveToken(token:string){
    this.token = token;
    localStorage.setItem('token',token);

  }

  public addUserToLocalStorage(user:User){
    localStorage.setItem('user',JSON.stringify(user));

  }

  public getUserFromLocalStorage() : User{
    //This will pasrse String to Object
    return JSON.parse(localStorage.getItem('user')!);

  }

  public loadToken(){
   this.token=  localStorage.getItem('token');
  }

  public getToken():string{
    return this.token!;
  }

  //npm i @auth0/angular-jwt   used for token validation

  //https://www.npmjs.com/package/@auth0/angular-jwt

  public validateToken(): boolean{
    this.loadToken();

    if(this.token!= null || this.token!= undefined){
      const decodedToken = this.helper.decodeToken(this.token);
       const expirationDate = this.helper.getTokenExpirationDate(this.token);
      const isExpired = this.helper.isTokenExpired(this.token);
      
      if(expirationDate!= null){
       this.loggedInUser =  this.helper.decodeToken(this.token).sub;

      }
      return true;

    }
    else{
      this.logout();
      return false;
    }
   
  }

  isUserLoggedIn(){
   this.validateToken();
    if(this.loggedInUser != null){
      return true;
    }
    else return false;
  }


}
