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
      this.toastrService.error('Boş alan boş bırakılamaz');
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
      this.employee.firstName == '' ||
      this.employee.lastName == null ||
      this.employee.lastName == undefined ||
      this.employee.lastName == '' ||
      this.employee.gender == null ||
      this.employee.gender == undefined ||
      this.employee.gender == '' ||
      this.employee.identificationNumber == null ||
      this.employee.identificationNumber == undefined ||
      this.employee.identificationNumber == '' ||
      this.employee.maritalStatus == null ||
      this.employee.maritalStatus == undefined ||
      this.employee.maritalStatus == '' ||
      this.employee.nationality == null ||
      this.employee.nationality == undefined ||
      this.employee.nationality == '' ||
      this.employee.placeOfBirth == null ||
      this.employee.placeOfBirth == undefined ||
      this.employee.placeOfBirth == '' ||
      this.employee.dateOfBirth == null ||
      this.employee.dateOfBirth == undefined ||
      this.employee.registrationNumber == null ||
      this.employee.registrationNumber == undefined ||
      this.employee.registrationNumber == '' ||
      this.employee.companyEntryDate == null ||
      this.employee.companyEntryDate == undefined ||
      this.employee.sgkEntryDate == null ||
      this.employee.sgkEntryDate == undefined ||
      this.employee.annualLeaveEntitlementStartDate == null ||
      this.employee.annualLeaveEntitlementStartDate == undefined ||
      this.employee.annualLeaveGroup == null ||
      this.employee.annualLeaveGroup == undefined ||
      this.employee.annualLeaveGroup == '' ||
      this.employee.severancePayStartDate == null ||
      this.employee.severancePayStartDate == undefined ||
      this.employee.oyakStartDateOfWork == null ||
      this.employee.oyakStartDateOfWork == undefined ||
      this.employee.firstDateOfJoiningTheGroup == null ||
      this.employee.firstDateOfJoiningTheGroup == undefined ||
      this.employee.wage == null ||
      this.employee.wage == undefined ||
      this.employee.typeOfWage == null ||
      this.employee.typeOfWage == undefined ||
      this.employee.typeOfWage == '' ||
      this.employee.typeOfPayment == null ||
      this.employee.typeOfPayment == undefined ||
      this.employee.typeOfPayment == '' ||
      this.employee.paymentCurrency == null ||
      this.employee.paymentCurrency == undefined ||
      this.employee.paymentCurrency == ''
    ) {
      message = 'Boş alan boş bırakılamaz';
      return message;
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
