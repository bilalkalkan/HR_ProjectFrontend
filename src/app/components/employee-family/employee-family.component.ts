import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { EmployeeFamily } from 'src/app/models/employeeFamily';
import { FamilyMember } from 'src/app/models/familyMember';
import { EmployeeFamilyService } from 'src/app/services/employee-family.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-family',
  templateUrl: './employee-family.component.html',
  styleUrls: ['./employee-family.component.css'],
})
export class EmployeeFamilyComponent implements OnInit {
  employeeFamilies!: EmployeeFamily[];
  familyMembers!: FamilyMember[];
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
    this.getFamilyMembers();
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
  getFamilyMembers() {
    this.employeeFamilyService.getFamilyMembers().subscribe((response) => {
      this.familyMembers = response.data;
    });
  }
  getEmployeeFamily(id: number) {
    this.employeeFamilyService.getById(id).subscribe((response) => {
      this.employeeFamily = response.data;
      this.employeeFamily.dateOfBirth = new Date(response.data.dateOfBirth);
    });
  }

  save() {
    let message = this.validateCheck();
    if (message != '') {
      this.toastrService.error(message);
      return;
    }
    if (this.employeeFamily.id > 1) {
      this.employeeFamilyService.update(this.employeeFamily).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.getEmployeeFamilies();
          this.employeeFamily = new EmployeeFamily();
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error.Message);
        }
      );
    } else {
      this.employeeFamilyService.add(this.employeeFamily).subscribe(
        (response) => {
          this.toastrService.success(response.message);
          this.getEmployeeFamilies();
          this.employeeFamily = new EmployeeFamily();
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error.Message);
        }
      );
    }
  }

  deleteEmloyeeFamily(employeeFamily: EmployeeFamily) {
    this.employeeFamilyService.delete(employeeFamily).subscribe(
      (response) => {
        this.toastrService.success(response.message);
        this.getEmployeeFamilies();
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.Message);
      }
    );
  }
  validateCheck(): string {
    let message = '';
    if (
      this.employeeFamily.employeeId == null ||
      this.employeeFamily.employeeId == undefined
    ) {
      message = 'Çalışan alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeFamily.degree == null ||
      this.employeeFamily.degree == undefined ||
      this.employeeFamily.degree == ''
    ) {
      message = 'Yakınlık derecesi alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeFamily.firstName == null ||
      this.employeeFamily.firstName == undefined ||
      this.employeeFamily.firstName == ''
    ) {
      message = 'Yakının adı alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employeeFamily.lastName == null ||
      this.employeeFamily.lastName == undefined ||
      this.employeeFamily.lastName == ''
    ) {
      message = 'Yakının soyadı alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeFamily.gender == null ||
      this.employeeFamily.gender == undefined ||
      this.employeeFamily.gender == ''
    ) {
      message = 'Cinsiyet alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeFamily.dateOfBirth == null ||
      this.employeeFamily.dateOfBirth == undefined
    ) {
      message = 'Doğum tarihi alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employeeFamily.identificationNumber == null ||
      this.employeeFamily.identificationNumber == undefined ||
      this.employeeFamily.identificationNumber == ''
    ) {
      message = 'TC kimlik no alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employeeFamily.educationalStatus == null ||
      this.employeeFamily.educationalStatus == undefined ||
      this.employeeFamily.educationalStatus == ''
    ) {
      message = 'Okuma durumu alanı boş bırakılamaz';
      return message;
    }
    return message;
  }
  clear() {
    this.employeeFamily = new EmployeeFamily();
  }
}
