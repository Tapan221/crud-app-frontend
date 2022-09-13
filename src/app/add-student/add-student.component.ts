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
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  public showLoading: boolean;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private studentService: StudentService,
              private notificationService: NotificationService) {}

  ngOnInit(): void {
   
  }

  public addStudent(student: Student): void {
    this.showLoading = true;
    console.log(student);
    this.subscriptions.push(
      this.studentService.addStudent(student).subscribe(
        (response: Student) => {
          
          this.showLoading = false;
          this.sendNotification(NotificationType.SUCCESS, `A new Student Added for ${response.name}.`);
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
