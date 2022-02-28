import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { EmployeeVacation } from 'src/app/models/employeeVacation';
import { EmployeeVacationService } from 'src/app/services/employee-vacation.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { defineLocale, trLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-employee-vacation',
  templateUrl: './employee-vacation.component.html',
  styleUrls: ['./employee-vacation.component.css'],
})
export class EmployeeVacationComponent implements OnInit {
  employees!: Employee[];
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
  }

  getEmployees() {
    this.employeeService.getAll().subscribe((response) => {
      this.employees = response.data;
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
    if (this.employeeVacation.id > 0) {
      this.employeeVacationService
        .update(this.employeeVacation)
        .subscribe((response) => {
          this.employeeVacation = new EmployeeVacation();
          this.getEmployeeVacations();
          this.toastrService.success(response.message);
        });
    } else {
      this.employeeVacationService.add(this.employeeVacation).subscribe(
        (response) => {
          this.employeeVacation = new EmployeeVacation();
          this.getEmployeeVacations();
          this.toastrService.success(response.message);
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message, 'Hata');
        }
      );
    }
  }

  deleteEmployeeVacation(employeeVacation: EmployeeVacation) {
    this.employeeVacationService
      .delete(employeeVacation)
      .subscribe((response) => {
        this.getEmployeeVacations();
        this.toastrService.success(response.message);
      });
  }
  clear() {
    this.employeeVacation = new EmployeeVacation();
  }
}
