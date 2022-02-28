import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { EmployeeEducation } from 'src/app/models/employeeEducation';
import { EmployeeEducationService } from 'src/app/services/employee-education.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-education',
  templateUrl: './employee-education.component.html',
  styleUrls: ['./employee-education.component.css'],
})
export class EmployeeEducationComponent implements OnInit {
  employees!: Employee[];
  employeeEducation: EmployeeEducation = new EmployeeEducation();
  employeeEducations!: EmployeeEducation[];
  constructor(
    private employeeService: EmployeeService,
    private employeeEducationService: EmployeeEducationService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.employeeEducation = new EmployeeEducation();
    this.getEmployees();
    this.getEmployeeEducations();
  }
  getEmployees() {
    this.employeeService.getAll().subscribe((response) => {
      this.employees = response.data;
    });
  }
  getEmployeeEducations() {
    this.employeeEducationService.getAll().subscribe((response) => {
      this.employeeEducations = response.data;
    });
  }

  save() {
    if (this.employeeEducation.id > 0) {
      this.employeeEducationService
        .update(this.employeeEducation)
        .subscribe((response) => {
          this.employeeEducation = new EmployeeEducation();
          this.getEmployeeEducations();
          this.toastrService.success(response.message);
        });
    } else {
      this.employeeEducationService
        .add(this.employeeEducation)
        .subscribe((response) => {
          this.employeeEducation = new EmployeeEducation();
          this.getEmployeeEducations();
          this.toastrService.success(response.message);
        });
    }
  }
  getEmployeeEducation(id: number) {
    this.employeeEducationService.getById(id).subscribe((response) => {
      this.employeeEducation = response.data;
    });
  }
  deleteEmployeeEducation(employeeEducation: EmployeeEducation) {
    this.employeeEducationService
      .delete(employeeEducation)
      .subscribe((response) => {
        this.getEmployeeEducations();
        this.employeeEducation = new EmployeeEducation();
        this.toastrService.success(response.message);
      });
  }

  clear(){
    this.employeeEducation=new EmployeeEducation();
  }
}
