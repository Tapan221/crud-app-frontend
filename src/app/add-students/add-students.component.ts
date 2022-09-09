import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from '../enum/header-type-enum';
import { NotificationType } from '../enum/notification-enum';
import { Student } from '../model/student';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit {

  showLoading: boolean = false;
  private subscriptions: Subscription[] = [];
  public  stdObject:Student | undefined ;

  constructor(private router:Router,private authenticationService:AuthenticationService, private studentService:StudentService,
    private notificationService:NotificationService) { }

  ngOnInit(): void {
  }

  add(student:Student):void{
    this.showLoading = true;
    console.log(student);
    this.subscriptions.push(
      this.studentService.add(student).subscribe(
        response=>{       
          this.showLoading = false;
          
          if(response.body != null)
          this.stdObject= response.body;
          this.notificationService.notify(NotificationType.SUCCESS,"STUDENT ADDED SUCCESSFULLY")
        },
        errorResponse=>{
          console.log(errorResponse);
          this.errorNotification(NotificationType.ERROR,errorResponse.error.message);
          this.showLoading = false;

        }
      )
    );

  }
  errorNotification(ERROR: NotificationType, message: any) {
    if(message){
      this.notificationService.notify(ERROR,message);

    }
    else{
      this.notificationService.notify(ERROR,'SOME ERROR OCCOURED , PLEASE TRY AGAIN');
    }
  }

}
