import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { EmployeeVacation } from 'src/app/models/employeeVacation';
import { EmployeeVacationService } from 'src/app/services/employee-vacation.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { defineLocale, trLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { AllowanceType } from 'src/app/models/allowanceType';
@Component({
  selector: 'app-employee-vacation',
  templateUrl: './employee-vacation.component.html',
  styleUrls: ['./employee-vacation.component.css'],
})
export class EmployeeVacationComponent implements OnInit {
  employees!: Employee[];
  allowanceTypes!: AllowanceType[];
  employeeVacation: EmployeeVacation = new EmployeeVacation();
  employeeVacations!: EmployeeVacation[];

  constructor(
    private employeeService: EmployeeService,
    private localeService: BsLocaleService,

    private employeeVacationService: EmployeeVacationService,
    private toastrService: ToastrService
  ) {
    defineLocale('tr', trLocale);
    this.localeService.use('tr');
  }

  ngOnInit(): void {
    this.getEmployees();
    this.getEmployeeVacations();
    this.getAllowanceTypes();
  }

  getEmployees() {
    this.employeeService.getAll().subscribe((response) => {
      this.employees = response.data;
    });
  }
  getAllowanceTypes() {
    this.employeeVacationService.getAllowanceTypes().subscribe((response) => {
      this.allowanceTypes = response.data;
    });
  }
  getEmployeeVacations() {
    this.employeeVacationService.getAll().subscribe((response) => {
      this.employeeVacations = response.data;
    });
  }

  getEmployeeVacation(id: number) {
    this.employeeVacationService.get(id).subscribe((response) => {
      this.employeeVacation = response.data;
      this.employeeVacation.allowanceStartingDate = new Date(
        this.employeeVacation.allowanceStartingDate
      );
      this.employeeVacation.allowanceExpirationDate = new Date(
        this.employeeVacation.allowanceExpirationDate
      );
    });
  }

  save() {
    let message = this.validateCheck();
    if (message != '') {
      this.toastrService.error('Boş alan bırakılamaz');
      return;
    }
    if (this.employeeVacation.id > 0) {
      this.employeeVacationService.update(this.employeeVacation).subscribe(
        (response) => {
          this.employeeVacation = new EmployeeVacation();
          this.getEmployeeVacations();
          this.toastrService.success(response.message);
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error.Message);
        }
      );
    } else {
      this.employeeVacationService.add(this.employeeVacation).subscribe(
        (response) => {
          this.employeeVacation = new EmployeeVacation();
          this.getEmployeeVacations();
          this.toastrService.success(response.message);
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error.Message);
        }
      );
    }
  }

  deleteEmployeeVacation(employeeVacation: EmployeeVacation) {
    this.employeeVacationService.delete(employeeVacation).subscribe(
      (response) => {
        this.getEmployeeVacations();
        this.toastrService.success(response.message);
      },
      (errorResponse) => {
        console.log(errorResponse.error);
        this.toastrService.error(errorResponse.error.Message);
      }
    );
  }

  validateCheck(): string {
    let message = '';
    if (
      this.employeeVacation.employeeId == null ||
      this.employeeVacation.employeeId == undefined
    ) {
      message = 'Çalışan alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employeeVacation.allowanceType == null ||
      this.employeeVacation.allowanceType == undefined ||
      this.employeeVacation.allowanceType == ''
    ) {
      message = 'İzin türü alanı boş bırakılmaz';
      return message;
    }
    if (
      this.employeeVacation.allowanceStartingDate == null ||
      this.employeeVacation.allowanceStartingDate == undefined
    ) {
      message = 'Başlangıç tarihi boş bırakılamaz';
      return message;
    }
    if (
      this.employeeVacation.allowanceExpirationDate == null ||
      this.employeeVacation.allowanceExpirationDate == undefined
    ) {
      message = 'Bitiş tarihi boş bırakılamaz';
      return message;
    }
    if (
      this.employeeVacation.addressToBeAllowed == null ||
      this.employeeVacation.addressToBeAllowed == undefined ||
      this.employeeVacation.addressToBeAllowed == ''
    ) {
      message = 'Adres alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeVacation.statement == null ||
      this.employeeVacation.statement == undefined ||
      this.employeeVacation.statement == ''
    ) {
      message = 'Açıklama alanı boş bırakılamaz';
      return message;
    }
    return message;
  }

  clear() {
    this.employeeVacation = new EmployeeVacation();
  }
}
