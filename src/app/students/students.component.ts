import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { User } from '../model/user';
import { NotificationType } from '../enum/notification-type.enum';
import { Student } from '../model/student';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  public showLoading: boolean;
  private subscriptions: Subscription[] = [];
  studentArray: Student[]= [];

  constructor(private router: Router, private studentService: StudentService,
              private notificationService: NotificationService) {}

  ngOnInit(): void {
   this.getAllStudents();
  }

  public getAllStudents(): void {
    this.showLoading = true;
    this.subscriptions.push(
      this.studentService.getAllStudents().subscribe(
        (response: Student[]) => {
          console.log(response);
          this.studentArray = response;
          
          console.log( this.studentArray)
          this.sendNotification(NotificationType.SUCCESS, `retrieved all Students`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
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
