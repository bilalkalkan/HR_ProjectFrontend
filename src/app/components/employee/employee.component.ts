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
      this.employeeService.add(this.employee).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.employee = new Employee();
          this.getEmployees();
        },
        (erroResponse) => {
          this.toastrService.error(erroResponse.error);
        }
      );
    }
  }

  ValidateCheck(): string {
    let message = '';
    if (
      this.employee.firstName == null ||
      this.employee.firstName == undefined ||
      this.employee.firstName == ''
    ) {
      message = 'Ad alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employee.lastName == null ||
      this.employee.lastName == undefined ||
      this.employee.lastName == ''
    ) {
      message = 'soyad alanı boş bırakılamaz';
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
    if (
      this.employee.dateOfBirth == null ||
      this.employee.dateOfBirth == undefined
    ) {
      message = 'Doğum tarihi boş bırakılamaz';
      return message;
    }

    if (
      this.employee.companyEntryDate == null ||
      this.employee.companyEntryDate == undefined
    ) {
      message = 'Şirkete giriş tarihi alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employee.sgkEntryDate == null ||
      this.employee.sgkEntryDate == undefined
    ) {
      message = 'SGK giriş tarihi boş bırakılamaz';
      return message;
    }
    if (
      this.employee.annualLeaveEntitlementStartDate == null ||
      this.employee.annualLeaveEntitlementStartDate == undefined
    ) {
      message = 'Yıllık izin hakediş tarihi alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employee.severancePayStartDate == null ||
      this.employee.severancePayStartDate == undefined
    ) {
      message = 'Kıdem tazminatı başlangıç tarihi alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employee.oyakStartDateOfWork == null ||
      this.employee.oyakStartDateOfWork == undefined
    ) {
      message = 'OYAK işe giriş tarihi alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employee.firstDateOfJoiningTheGroup == null ||
      this.employee.firstDateOfJoiningTheGroup == undefined
    ) {
      message = 'Gruba ilk giriş tarihi alanı boş bırakılamaz';
      return message;
    }
    if (this.employee.wage == null || this.employee.wage == undefined) {
      message = 'Ücret alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employee.typeOfWage == null ||
      this.employee.typeOfWage == undefined ||
      this.employee.typeOfWage == ''
    ) {
      message = 'Ücret türü alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employee.typeOfPayment == null ||
      this.employee.typeOfPayment == undefined ||
      this.employee.typeOfPayment == ''
    ) {
      message = 'Ödeme şekli alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employee.paymentCurrency == null ||
      this.employee.paymentCurrency == undefined ||
      this.employee.paymentCurrency == ''
    ) {
      message = 'Ödeme yapılan para birimi alanı boş bırakılamaz';
      return message;
    }
    return message;
  }

  delete(employee: Employee) {
    this.employeeService.delete(employee).subscribe(
      (response) => {
        this.toastrService.success(response.message);
        this.getEmployees();
      },
      (erroResponse) => {
        console.log(erroResponse.error);
        this.toastrService.error(erroResponse.error.Message);
      }
    );
  }
  clear() {
    this.employee = new Employee();
  }
}
