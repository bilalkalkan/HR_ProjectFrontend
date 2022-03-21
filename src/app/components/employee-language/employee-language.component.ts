import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { EmployeeLanguage } from 'src/app/models/employeeLanguage';
import { Language } from 'src/app/models/language';
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
  languages!: Language[];
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
    this.getLanguages();
  }

  getEmployees() {
    this.employeeService.getAll().subscribe((response) => {
      this.employees = response.data;
    });
  }
  getLanguages() {
    this.employeeLanguageService.getLanguages().subscribe((response) => {
      this.languages = response.data;
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
    let message = this.validateCheck();
    if (message != '') {
      this.toastrService.error(message);
      return;
    }
    if (this.employeeLanguage.id > 0) {
      this.employeeLanguageService.update(this.employeeLanguage).subscribe(
        (response) => {
          this.employeeLanguage = new EmployeeLanguage();
          this.toastrService.success(response.message);
          this.getEmployeeLanguages();
        },
        (errorResponse) => {
          this.toastrService.error(
            errorResponse.error.Message || errorResponse.error.message
          );
        }
      );
    } else {
      this.employeeLanguageService.add(this.employeeLanguage).subscribe(
        (response) => {
          this.employeeLanguage = new EmployeeLanguage();
          this.toastrService.success(response.message);
          this.getEmployeeLanguages();
        },
        (errorResponse) => {
          this.toastrService.error(
            errorResponse.error.Message || errorResponse.error.message
          );
        }
      );
    }
  }

  deleteEmployeeLanguage(employeeLanguage: EmployeeLanguage) {
    this.employeeLanguageService.delete(employeeLanguage).subscribe(
      (response) => {
        this.getEmployeeLanguages();
        this.toastrService.success(response.message);
      },
      (errorResponse) => {
        this.toastrService.error(
          errorResponse.error.Message || errorResponse.error.message
        );
      }
    );
  }

  validateCheck(): string {
    let message = '';
    if (
      this.employeeLanguage.employeeId == null ||
      this.employeeLanguage.employeeId == undefined
    ) {
      message = 'Çalışan alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employeeLanguage.foreignLanguage == null ||
      this.employeeLanguage.foreignLanguage == undefined ||
      this.employeeLanguage.foreignLanguage == ''
    ) {
      message = 'Yabancı dili alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employeeLanguage.reading == null ||
      this.employeeLanguage.reading == undefined ||
      this.employeeLanguage.reading == ''
    ) {
      message = 'Okuma alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeLanguage.talking == null ||
      this.employeeLanguage.talking == undefined ||
      this.employeeLanguage.talking == ''
    ) {
      message = 'Konuşma alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeLanguage.writing == null ||
      this.employeeLanguage.writing == undefined ||
      this.employeeLanguage.writing == ''
    ) {
      message = 'Konuşma alanı boş bırakılamaz';
      return message;
    }
    return message;
  }

  clear() {
    this.employeeLanguage = new EmployeeLanguage();
  }
}
