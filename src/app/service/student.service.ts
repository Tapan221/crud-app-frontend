import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private host = environment.apiUrl;

  constructor(private http:HttpClient) { }

  add(student:Student): Observable<HttpResponse<Student>>{
    return this.http.post<Student>(`${this.host}/studentsapi/student`,student,{observe:'response'});
  }

  getAllStudents(): Observable<HttpResponse<Student[]>>{
    return this.http.get<Student[]>(`${this.host}/studentsapi/getAllStudents`,{observe:'response'});
  }
}
