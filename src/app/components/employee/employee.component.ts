import { Component, OnInit } from '@angular/core';
import { defineLocale, trLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { Nationality } from 'src/app/models/nationality';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees!: Employee[];
  employee: Employee = new Employee();
  nationalities!: Nationality[];
  constructor(
    private employeeService: EmployeeService,
    private localeService: BsLocaleService,
    private toastrService: ToastrService
  ) {
    defineLocale('tr', trLocale);
    this.localeService.use('tr');
  }
  ngOnInit(): void {
    this.employee = new Employee();

    this.getEmployees();
    this.getNationalities();
  }

  onFormSubmit() {
    this.save();
  }
  getEmployees() {
    this.employeeService.getAll().subscribe((response) => {
      this.employees = response.data;
    });
  }
  getNationalities() {
    this.employeeService.getNationalities().subscribe((response) => {
      this.nationalities = response.data;
    });
  }
  getEmployee(employeeId: number) {
    this.employeeService.getById(employeeId).subscribe((response) => {
      this.employee = response.data;
      this.employee.dateOfBirth = new Date(response.data.dateOfBirth);
      this.employee.sgkEntryDate = new Date(response.data.sgkEntryDate);
      this.employee.companyEntryDate = new Date(response.data.companyEntryDate);
      this.employee.annualLeaveEntitlementStartDate = new Date(
        response.data.annualLeaveEntitlementStartDate
      );
      this.employee.severancePayStartDate = new Date(
        response.data.severancePayStartDate
      );
      this.employee.oyakStartDateOfWork = new Date(
        response.data.oyakStartDateOfWork
      );
      this.employee.firstDateOfJoiningTheGroup = new Date(
        response.data.firstDateOfJoiningTheGroup
      );
    });
  }

  save() {
    let message = this.ValidateCheck();
    if (message != '') {
      this.toastrService.error(message);
      return;
    }

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

  ValidateCheck(): string {
    let message = '';
    if (
      this.employee.firstName == null ||
      this.employee.firstName == undefined ||
      this.employee.firstName == ''
    ) {
      message = 'Ad alan boş bırakılamaz';
      return message;
    }

    if (
      this.employee.lastName == null ||
      this.employee.lastName == undefined ||
      this.employee.lastName == ''
    ) {
      message = 'soyad alan boş bırakılamaz';
      return message;
    }
    if (
      this.employee.identificationNumber == null ||
      this.employee.identificationNumber == undefined ||
      this.employee.identificationNumber == ''
    ) {
      message = 'Tc kimlik no alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employee.gender == null ||
      this.employee.gender == undefined ||
      this.employee.gender == ''
    ) {
      message = 'Cinsiyet alanı boş bıralılamaz';
      return message;
    }
    if (this.employee.nationality == null) {
    }

    return message;
  }

  delete(employee: Employee) {
    this.employeeService.delete(employee).subscribe((response) => {
      this.toastrService.success(response.message);
      this.getEmployees();
    });
  }
  clear() {
    this.employee = new Employee();
  }
}
