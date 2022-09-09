import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentsComponent } from './add-students/add-students.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'student', component: StudentComponent},
  {path: 'addStudent', component: AddStudentsComponent},
  {path: '', redirectTo:'login',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
