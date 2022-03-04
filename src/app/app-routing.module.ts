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
const routes: Routes = [
  { path: 'employee', component: EmployeeComponent },
  { path: 'employeeFamily', component: EmployeeFamilyComponent },
  { path: 'employeeEducation', component: EmployeeEducationComponent },
  { path: 'employeeLanguage', component: EmployeeLanguageComponent },
  { path: 'employeeDebit', component: EmployeeDebitComponent },
  { path: 'employeeVacation', component: EmployeeVacationComponent },
  { path: 'items', component: AllowanceTypeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
