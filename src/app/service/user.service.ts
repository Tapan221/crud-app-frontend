import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { CustomHttpResponse } from '../model/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.apiUrl;
  private token: string | undefined |null;
  private helper = new JwtHelperService();
  loggedInUser: string|null|undefined;

  constructor(private http:HttpClient) { }


  

  public getUser():Observable<User[] | HttpErrorResponse>{
    return  this.http.get<User[]>(`${this.host}/user/list`);
   }
 
   public addUser(formData:FormData):Observable<User | HttpErrorResponse>{
     return  this.http.post<User>(`${this.host}/user/add`,formData);
   }
 
   public updateUser(formData:FormData):Observable<User | HttpErrorResponse>{
     return  this.http.post<User>(`${this.host}/user/update`,formData);
   }
 
   public resetPassword(email:string):Observable<CustomHttpResponse | HttpErrorResponse>{
     return  this.http.get<CustomHttpResponse>(`${this.host}/user/resetPassword/${email}`);
   }
 
   public updateProfileImage(formData:FormData):Observable<HttpEvent<User> | HttpErrorResponse>{
     return  this.http.post<User>(`${this.host}/user/resetPassword/updateProfileImage`,formData,
     {
       reportProgress:true,
       observe:'events'
     }
     
     );
   }
 
   public deleteUser(userId:number):Observable<CustomHttpResponse | HttpErrorResponse>{
     return  this.http.delete<CustomHttpResponse>(`${this.host}/user/delete/${userId}`);
   }
 
   public addUsersToLocalCache(users:User[]):void{
     localStorage.setItem('users',JSON.stringify(users));
 
   }
 
   public getUsersToLocalCache():any{
    if( localStorage.getItem('users')){
       return JSON.parse(localStorage.getItem('users')!);
    }
    else
       return null;
 
   }

   public createUserFormData(loggedInUserName:string, user:User, profileImage:File): FormData{

    const formData = new FormData();

    formData.append('currentUserName',loggedInUserName);
    formData.append('firstName',user.firstName);
    formData.append('lastName',user.lastName);
    formData.append('userName',user.username);
    formData.append('email',user.email);
    formData.append('role',user.role);
    formData.append('profileImage',user.profileImageUrl);
    formData.append('isActive',JSON.stringify(user.isActive));
    formData.append('isNotLocked',JSON.stringify(user.isNotLocked));

    return formData;


   }
 

 
}
