import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { Nationality } from 'src/app/models/nationality';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-report',
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.css'],
})
export class EmployeeReportComponent implements OnInit {
  employees!: Employee[];
  employee: Employee = new Employee();
  nationalities!: Nationality[];

  constructor(
    private employeeService: EmployeeService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getNationalities();
  }
  getEmployeeByFilter() {
    this.employeeService
      .getEmployeeFilter(
        this.employee.gender,
        this.employee.nationality,
        this.employee.identificationNumber
      )
      .subscribe({
        next: (response) => {
          this.employees = response.data;
          console.log(response.data);
        },
        error: (errorResponse) => {
          this.toastrService.error(
            errorResponse.error.message || errorResponse.error.Message
          );
        },
      });
  }
  getNationalities() {
    this.employeeService.getNationalities().subscribe((response) => {
      this.nationalities = response.data;
    });
  }
}
