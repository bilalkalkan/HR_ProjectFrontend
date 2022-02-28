import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { EmployeeFamily } from 'src/app/models/employeeFamily';
import { EmployeeFamilyService } from 'src/app/services/employee-family.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-family',
  templateUrl: './employee-family.component.html',
  styleUrls: ['./employee-family.component.css'],
})
export class EmployeeFamilyComponent implements OnInit {
  employeeFamilies!: EmployeeFamily[];
  employeeFamily: EmployeeFamily = new EmployeeFamily();
  employees!: Employee[];
  constructor(
    private employeeFamilyService: EmployeeFamilyService,
    private employeService: EmployeeService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.employeeFamily = new EmployeeFamily();
    this.getEmployees();
    this.getEmployeeFamilies();
  }
  getEmployees() {
    this.employeService.getAll().subscribe((response) => {
      this.employees = response.data;
    });
  }
  getEmployeeFamilies() {
    this.employeeFamilyService.getAll().subscribe((response) => {
      this.employeeFamilies = response.data;
    });
  }
  getEmployeeFamily(id: number) {
    this.employeeFamilyService.getById(id).subscribe((response) => {
      this.employeeFamily = response.data;
      this.employeeFamily.dateOfBirth=new Date(response.data.dateOfBirth)
    });
  }
  save() {
    if (this.employeeFamily.id > 1) {
      this.employeeFamilyService
        .update(this.employeeFamily)
        .subscribe((response) => {
          this.toastrService.success(response.message);
          this.getEmployeeFamilies();

          this.employeeFamily = new EmployeeFamily();
        });
    } else {
      this.employeeFamilyService
        .add(this.employeeFamily)
        .subscribe((response) => {
          this.toastrService.success(response.message);
          this.getEmployeeFamilies();

          this.employeeFamily = new EmployeeFamily();
        });
    }
  }
  deleteEmloyeeFamily(employeeFamily: EmployeeFamily) {
    this.employeeFamilyService.delete(employeeFamily).subscribe((response) => {
      this.toastrService.success(response.message);
      this.getEmployeeFamilies();
    });
  }

  clear(){
    this.employeeFamily=new EmployeeFamily();
  }
}
