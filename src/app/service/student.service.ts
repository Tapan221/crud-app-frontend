import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { CustomHttpRespone } from '../model/custom-http-response';
import { PasswordReset } from '../model/passwordForm';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.host}/api/getAllStudents`);
  }

  public addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.host}/api/addStudent`, student);
  }

  public updateUser(formData: FormData): Observable<User> {
    return this.http.post<User>(`${this.host}/user/update`, formData);
  }

 
}
