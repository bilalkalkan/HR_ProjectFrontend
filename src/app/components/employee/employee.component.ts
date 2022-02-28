import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { defineLocale, trLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees!: Employee[];
  employee: Employee = new Employee();

  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private localeService: BsLocaleService,
    private toastrService: ToastrService
  ) {
    defineLocale('tr', trLocale);
    this.localeService.use('tr');
  }
  ngOnInit(): void {
    this.employee = new Employee();

    this.getEmployees();
  }

  onFormSubmit() {
    this.save();
  }
  getEmployees() {
    this.employeeService.getAll().subscribe((response) => {
      this.employees = response.data;
    });
  }

  getEmployee(employeeId: number) {
    this.employeeService.getById(employeeId).subscribe((response) => {
      this.employee = response.data;
      this.employee.dateOfBirth = new Date(response.data.dateOfBirth);
      this.employee.sgkEntryDate=new Date(response.data.sgkEntryDate)
      this.employee.companyEntryDate = new Date(response.data.companyEntryDate);
      this.employee.annualLeaveEntitlementStartDate=new Date(response.data.annualLeaveEntitlementStartDate)
      this.employee.annualLeaveGroup=new Date(response.data.annualLeaveGroup);
      this.employee.severancePayStartDate=new Date(response.data.severancePayStartDate)
      this.employee.oyakStartDateOfWork=new Date(response.data.oyakStartDateOfWork)
      this.employee.firstDateOfJoiningTheGroup=new Date(response.data.firstDateOfJoiningTheGroup)
    });
  }

  save() {
    if (this.employee.id > 0) {
      this.employeeService.update(this.employee).subscribe((response) => {
        this.toastrService.success(response.message);
        this.getEmployees();
        this.employee = new Employee();
      });
    } else {
      this.employeeService.add(this.employee).subscribe((response) => {
        this.toastrService.success(response.message);
        this.employee = new Employee();
        this.getEmployees();
      });
    }
  }

  delete(employee: Employee) {
    this.employeeService.delete(employee).subscribe((response) => {
      this.toastrService.success(response.message);
      this.getEmployees();
    });
  }
  clear(){
    this.employee=new Employee();
  }
}
