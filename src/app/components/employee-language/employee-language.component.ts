import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { EmployeeLanguage } from 'src/app/models/employeeLanguage';
import { EmployeeLanguageService } from 'src/app/services/employee-language.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-language',
  templateUrl: './employee-language.component.html',
  styleUrls: ['./employee-language.component.css'],
})
export class EmployeeLanguageComponent implements OnInit {
  employees!: Employee[];
  employeeLanguages!: EmployeeLanguage[];
  employeeLanguage: EmployeeLanguage = new EmployeeLanguage();
  constructor(
    private employeeLanguageService: EmployeeLanguageService,
    private toastrService: ToastrService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeLanguage = new EmployeeLanguage();
    this.getEmployees();
    this.getEmployeeLanguages();
  }

  getEmployees() {
    this.employeeService.getAll().subscribe((response) => {
      this.employees = response.data;
    });
  }

  getEmployeeLanguages() {
    this.employeeLanguageService.getAll().subscribe((response) => {
      this.employeeLanguages = response.data;
    });
  }

  getEmployeeLanguage(id: number) {
    this.employeeLanguageService.getById(id).subscribe((response) => {
      this.employeeLanguage = response.data;
    });
  }

  save() {
    if (this.employeeLanguage.id > 0) {
      this.employeeLanguageService
        .update(this.employeeLanguage)
        .subscribe((response) => {
          this.employeeLanguage = new EmployeeLanguage();
          this.toastrService.success(response.message);
          this.getEmployeeLanguages();
        });
    } else {
      this.employeeLanguageService
        .add(this.employeeLanguage)
        .subscribe((response) => {
          this.employeeLanguage = new EmployeeLanguage();

          this.toastrService.success(response.message);
          this.getEmployeeLanguages();

        });
    }
  }

  deleteEmployeeLanguage(employeeLanguage: EmployeeLanguage) {
    this.employeeLanguageService
      .delete(employeeLanguage)
      .subscribe((response) => {
        this.getEmployeeLanguages();
        this.toastrService.success(response.message);
      });
  }

  clear(){
    this.employeeLanguage=new EmployeeLanguage();
  }
}
