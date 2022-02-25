import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeComponent } from './components/employee/employee.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EmployeeFamilyComponent } from './components/employee-family/employee-family.component';
import { HomeComponent } from './components/home/home.component';
import { EmployeeEducationComponent } from './components/employee-education/employee-education.component';

@NgModule({
  declarations: [AppComponent, EmployeeComponent, EmployeeFamilyComponent, HomeComponent, EmployeeEducationComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),                            
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    NgbModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
