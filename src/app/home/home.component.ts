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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public studentList:Student[]=[];
  private subscriptions: Subscription[] = [];
  showLoading: boolean | undefined;

  constructor(private router:Router,private authenticationService:AuthenticationService, private studentService:StudentService,
    private notificationService:NotificationService) { }

  ngOnInit(): void {
      this.getAllStudents();
  }

  public getAllStudents():void{
    this.showLoading = true;
    this.subscriptions.push(
      this.studentService.getAllStudents().subscribe(
        response=>{       
          this.showLoading = false;
          if(response.body != null){
            this.studentList = response.body;   
            console.log(this.studentList);     
            this.notificationService.notify(NotificationType.SUCCESS,"STUDENT OBJECTS RETRIEVED SUCCESSFULLY");

          }
          
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
