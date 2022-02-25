import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeFamilyComponent } from './components/employee-family/employee-family.component';
import { EmployeeEducationComponent } from './components/employee-education/employee-education.component';
const routes: Routes = [
  {path:'employee',component:EmployeeComponent},
  {path:'employeeFamily',component:EmployeeFamilyComponent},
  {path:'employeeEducation',component:EmployeeEducationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
