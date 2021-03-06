import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EmployeeComponent } from './components/employee/employee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EmployeeFamilyComponent } from './components/employee-family/employee-family.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeEducationComponent } from './components/employee-education/employee-education.component';
import { EmployeeLanguageComponent } from './components/employee-language/employee-language.component';
import { EmployeeDebitComponent } from './components/employee-debit/employee-debit.component';
import { EmployeeVacationComponent } from './components/employee-vacation/employee-vacation.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AllowanceTypeComponent } from './components/items/allowance-type.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { OperationClaimComponent } from './components/operation-claim/operation-claim.component';
import { NaviComponent } from './components/navi/navi.component';
import { EmployeeComputerInformationComponent } from './components/employee-computer-information/employee-computer-information.component';
import { EmployeeEmergencyInformationComponent } from './components/employee-emergency-information/employee-emergency-information.component';
import { EmployeeContactInformationComponent } from './components/employee-contact-information/employee-contact-information.component';
import { EmployeePastWorkExperienceComponent } from './components/employee-past-work-experience/employee-past-work-experience.component';
import { EmployeeAwardInformationComponent } from './components/employee-award-information/employee-award-information.component';
import { EmployeeReportComponent } from './components/employee-report/employee-report.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeFamilyComponent,
    HomeComponent,
    EmployeeEducationComponent,
    EmployeeLanguageComponent,
    EmployeeDebitComponent,
    EmployeeVacationComponent,
    AllowanceTypeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    OperationClaimComponent,
    NaviComponent,
    EmployeeComputerInformationComponent,
    EmployeeEmergencyInformationComponent,
    EmployeeContactInformationComponent,
    EmployeePastWorkExperienceComponent,
    EmployeeAwardInformationComponent,
    EmployeeReportComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgSelectModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    NgbModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
