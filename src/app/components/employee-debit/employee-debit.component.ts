import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { defineLocale, trLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

import { EmployeeDebit } from 'src/app/models/employeeDebit';
import { EmployeeDebitService } from 'src/app/services/employee-debit.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-debit',
  templateUrl: './employee-debit.component.html',
  styleUrls: ['./employee-debit.component.css'],
})
export class EmployeeDebitComponent implements OnInit {
  employeeDebits!: EmployeeDebit[];
  employees!: Employee[];
  employeeDebit: EmployeeDebit = new EmployeeDebit();
  constructor(
    private employeeService: EmployeeService,
    private employeeDebitService: EmployeeDebitService,
    private toastrService: ToastrService,
    private localeService: BsLocaleService
  ) {
    defineLocale('tr', trLocale);
    this.localeService.use('tr');
  }

  ngOnInit(): void {
    this.employeeDebit = new EmployeeDebit();
    this.getEmployees();
    this.getEmployeeDebits();
  }

  getEmployees() {
    this.employeeService.getAll().subscribe((response) => {
      this.employees = response.data;
    });
  }

  getEmployeeDebits() {
    this.employeeDebitService.getAll().subscribe((response) => {
      this.employeeDebits = response.data;
    });
  }

  getEmployeeDebit(id: number) {
    this.employeeDebitService.get(id).subscribe((response) => {
      this.employeeDebit = response.data;
      this.employeeDebit.debitDeliveryDate = new Date(
        this.employeeDebit.debitDeliveryDate
      );
      this.employeeDebit.debitReturnDate = new Date(
        this.employeeDebit.debitReturnDate
      );
    });
  }

  save() {
    if (this.employeeDebit.id > 0) {
      this.employeeDebitService
        .update(this.employeeDebit)
        .subscribe((response) => {
          this.employeeDebit = new EmployeeDebit();
          this.getEmployeeDebits();
          this.toastrService.success(response.message);
        });
    } else {
      this.employeeDebitService
        .add(this.employeeDebit)
        .subscribe((response) => {
          this.employeeDebit = new EmployeeDebit();
          this.getEmployeeDebits();
          this.toastrService.success(response.message);
        });
    }
  }

  deleteEmployeeDebit(employeeDebit: EmployeeDebit) {
    this.employeeDebitService.delete(employeeDebit).subscribe((response) => {
      this.getEmployeeDebits();
      this.toastrService.success(response.message);
    });
  }

  clear(){
    this.employeeDebit=new EmployeeDebit();
  }
}
