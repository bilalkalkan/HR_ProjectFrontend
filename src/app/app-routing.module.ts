import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeFamilyComponent } from './components/employee-family/employee-family.component';
import { EmployeeEducationComponent } from './components/employee-education/employee-education.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeLanguageComponent } from './components/employee-language/employee-language.component';
import { EmployeeDebitComponent } from './components/employee-debit/employee-debit.component';
import { EmployeeVacationComponent } from './components/employee-vacation/employee-vacation.component';
import { AllowanceTypeComponent } from './components/items/allowance-type/allowance-type.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { OperationClaimComponent } from './components/operation-claim/operation-claim.component';
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
  { path: 'operationClaim', component: OperationClaimComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
