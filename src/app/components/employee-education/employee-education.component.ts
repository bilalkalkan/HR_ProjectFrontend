import { Component, OnInit } from '@angular/core';
import { defineLocale, trLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { EducationLevel } from 'src/app/models/educationLevel';
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
  educationLevels!: EducationLevel[];
  constructor(
    private employeeService: EmployeeService,
    private employeeEducationService: EmployeeEducationService,
    private toastrService: ToastrService,
    private localeService: BsLocaleService
  ) {
    defineLocale('tr', trLocale);
    this.localeService.use('tr');
  }

  ngOnInit(): void {
    this.employeeEducation = new EmployeeEducation();
    this.getEmployees();
    this.getEmployeeEducations();
    this.getEducationLevels();
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

  getEducationLevels() {
    this.employeeEducationService.getEducationLevels().subscribe((response) => {
      this.educationLevels = response.data;
    });
  }

  save() {
    let message = this.validateCheck();
    if (message != '') {
      this.toastrService.error('Boş alan bırakılamaz');
      return;
    }
    if (this.employeeEducation.id > 0) {
      this.employeeEducationService.update(this.employeeEducation).subscribe(
        (response) => {
          this.employeeEducation = new EmployeeEducation();
          this.getEmployeeEducations();
          this.toastrService.success(response.message);
        },
        (responseError) => {
          console.log(responseError.error);
          this.toastrService.error(
            responseError.error.Message || responseError.error.message
          );
        }
      );
    } else {
      this.employeeEducationService.add(this.employeeEducation).subscribe(
        (response) => {
          this.employeeEducation = new EmployeeEducation();
          this.getEmployeeEducations();
          this.toastrService.success(response.message);
        },
        (responseError) => {
          this.toastrService.error(
            responseError.error.Message || responseError.error.message
          );
        }
      );
    }
  }
  getEmployeeEducation(id: number) {
    this.employeeEducationService.getById(id).subscribe((response) => {
      this.employeeEducation = response.data;
    });
  }
  deleteEmployeeEducation(employeeEducation: EmployeeEducation) {
    this.employeeEducationService.delete(employeeEducation).subscribe(
      (response) => {
        this.getEmployeeEducations();
        this.employeeEducation = new EmployeeEducation();
        this.toastrService.success(response.message);
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.Message);
      }
    );
  }

  validateCheck(): string {
    let message = '';
    if (
      this.employeeEducation.employeeId == null ||
      this.employeeEducation.employeeId == undefined
    ) {
      message = 'Çalışan alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeEducation.educationalLevelId == null ||
      this.employeeEducation.educationalLevelId == undefined
    ) {
      message = 'Eğitim seviysesi alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeEducation.schoolYearOfStart == null ||
      this.employeeEducation.schoolYearOfStart == undefined
    ) {
      message = 'Okul başlangıç yılı alanı boş boş bırakılamaz';
      return message;
    }
    if (
      this.employeeEducation.schoolYearOfFinished == null ||
      this.employeeEducation.schoolYearOfFinished == undefined
    ) {
      message = 'Okul bitiş yılı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeEducation.diplomaGrade == null ||
      this.employeeEducation.diplomaGrade == undefined
    ) {
      message = 'Diploma notu alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employeeEducation.tractateName == null ||
      this.employeeEducation.tractateName == undefined ||
      this.employeeEducation.tractateName == ''
    ) {
      message = 'Tez adı alanı boş bırakılamaz';
      return message;
    }
    return message;
  }
  clear() {
    this.employeeEducation = new EmployeeEducation();
  }
}
