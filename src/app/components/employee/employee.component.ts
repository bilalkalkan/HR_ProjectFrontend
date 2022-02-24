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
    private toastrService: ToastrService
  ) {}
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

      // if (response.data.companyEntryDate !== null && response.data.companyEntryDate !== undefined) {
      //   this.employee.companyEntryDate = new Date(response.data.companyEntryDate);
      // }
    });
  }

  save() {
    if (this.employee.id > 1) {
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
}
