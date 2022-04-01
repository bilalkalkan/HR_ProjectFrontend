import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeFamilyComponent } from './components/employee-family/employee-family.component';
import { EmployeeEducationComponent } from './components/employee-education/employee-education.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeLanguageComponent } from './components/employee-language/employee-language.component';
import { EmployeeDebitComponent } from './components/employee-debit/employee-debit.component';
import { EmployeeVacationComponent } from './components/employee-vacation/employee-vacation.component';
import { AllowanceTypeComponent } from './components/items/allowance-type.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { OperationClaimComponent } from './components/operation-claim/operation-claim.component';
import { EmployeeComputerInformationComponent } from './components/employee-computer-information/employee-computer-information.component';
import { EmployeeEmergencyInformationComponent } from './components/employee-emergency-information/employee-emergency-information.component';
import { EmployeeContactInformation } from './models/employeeContactInformation';
import { EmployeeContactInformationComponent } from './components/employee-contact-information/employee-contact-information.component';
import { EmployeePastWorkExperienceComponent } from './components/employee-past-work-experience/employee-past-work-experience.component';
import { EmployeeAwardInformationComponent } from './components/employee-award-information/employee-award-information.component';
const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'employeeFamily',
    component: EmployeeFamilyComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'employeeEducation',
    component: EmployeeEducationComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'employeeLanguage',
    component: EmployeeLanguageComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'employeeDebit',
    component: EmployeeDebitComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'employeeVacation',
    component: EmployeeVacationComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'items',
    component: AllowanceTypeComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent },
  {
    path: 'operationClaim',
    component: OperationClaimComponent,
    canActivate: [LoginGuard],
  },
  { path: 'home', component: HomeComponent, canActivate: [LoginGuard] },
  {
    path: 'employeeComputerInformation',
    component: EmployeeComputerInformationComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'employeeEmergencyInformation',
    component: EmployeeEmergencyInformationComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'employeeContactInformation',
    component: EmployeeContactInformationComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'employeePastWorkExperience',
    component: EmployeePastWorkExperienceComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'employeeAwardInformation',
    component: EmployeeAwardInformationComponent,
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
