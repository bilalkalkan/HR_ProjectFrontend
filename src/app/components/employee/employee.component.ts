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
      this.employeeService.update(this.employee).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.getEmployees();
          this.employee = new Employee();
        },
        (errorResponse) => {
          this.toastrService.error(
            errorResponse.error.Message || errorResponse.error.message
          );
        }
      );
    } else {
      this.employeeService.add(this.employee).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.employee = new Employee();
          this.getEmployees();
        },
        (errorResponse) => {
          this.toastrService.error(
            errorResponse.error.message || errorResponse.error.Message
          );
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
      message = 'Ad alan?? bo?? b??rak??lamaz';
      return message;
    }

    if (
      this.employee.lastName == null ||
      this.employee.lastName == undefined ||
      this.employee.lastName == ''
    ) {
      message = 'soyad alan?? bo?? b??rak??lamaz';
      return message;
    }
    if (
      this.employee.identificationNumber == null ||
      this.employee.identificationNumber == undefined ||
      this.employee.identificationNumber == ''
    ) {
      message = 'Tc kimlik no alan?? bo?? b??rak??lamaz';
      return message;
    }
    if (
      this.employee.gender == null ||
      this.employee.gender == undefined ||
      this.employee.gender == ''
    ) {
      message = 'Cinsiyet alan?? bo?? b??ral??lamaz';
      return message;
    }
    if (
      this.employee.dateOfBirth == null ||
      this.employee.dateOfBirth == undefined
    ) {
      message = 'Do??um tarihi bo?? b??rak??lamaz';
      return message;
    }

    if (
      this.employee.companyEntryDate == null ||
      this.employee.companyEntryDate == undefined
    ) {
      message = '??irkete giri?? tarihi alan?? bo?? b??rak??lamaz';
      return message;
    }
    if (
      this.employee.sgkEntryDate == null ||
      this.employee.sgkEntryDate == undefined
    ) {
      message = 'SGK giri?? tarihi bo?? b??rak??lamaz';
      return message;
    }
    if (
      this.employee.annualLeaveEntitlementStartDate == null ||
      this.employee.annualLeaveEntitlementStartDate == undefined
    ) {
      message = 'Y??ll??k izin hakedi?? tarihi alan?? bo?? b??rak??lamaz';
      return message;
    }
    if (
      this.employee.severancePayStartDate == null ||
      this.employee.severancePayStartDate == undefined
    ) {
      message = 'K??dem tazminat?? ba??lang???? tarihi alan?? bo?? b??rak??lamaz';
      return message;
    }

    if (
      this.employee.oyakStartDateOfWork == null ||
      this.employee.oyakStartDateOfWork == undefined
    ) {
      message = 'OYAK i??e giri?? tarihi alan?? bo?? b??rak??lamaz';
      return message;
    }

    if (
      this.employee.firstDateOfJoiningTheGroup == null ||
      this.employee.firstDateOfJoiningTheGroup == undefined
    ) {
      message = 'Gruba ilk giri?? tarihi alan?? bo?? b??rak??lamaz';
      return message;
    }
    if (this.employee.wage == null || this.employee.wage == undefined) {
      message = '??cret alan?? bo?? b??rak??lamaz';
      return message;
    }
    if (
      this.employee.typeOfWage == null ||
      this.employee.typeOfWage == undefined ||
      this.employee.typeOfWage == ''
    ) {
      message = '??cret t??r?? alan?? bo?? b??rak??lamaz';
      return message;
    }
    if (
      this.employee.typeOfPayment == null ||
      this.employee.typeOfPayment == undefined ||
      this.employee.typeOfPayment == ''
    ) {
      message = '??deme ??ekli alan?? bo?? b??rak??lamaz';
      return message;
    }
    if (
      this.employee.paymentCurrency == null ||
      this.employee.paymentCurrency == undefined ||
      this.employee.paymentCurrency == ''
    ) {
      message = '??deme yap??lan para birimi alan?? bo?? b??rak??lamaz';
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
