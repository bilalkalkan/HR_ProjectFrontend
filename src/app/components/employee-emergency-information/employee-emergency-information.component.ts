import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { EmployeeEmergencyInformation } from 'src/app/models/employeeEmergencyInformation';
import { FamilyMember } from 'src/app/models/familyMember';
import { EmployeeEmergencyInformationService } from 'src/app/services/employee-emergency-information.service';
import { EmployeeFamilyService } from 'src/app/services/employee-family.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-emergency-information',
  templateUrl: './employee-emergency-information.component.html',
  styleUrls: ['./employee-emergency-information.component.css'],
})
export class EmployeeEmergencyInformationComponent implements OnInit {
  employeeEmergencyInformations!: EmployeeEmergencyInformation[];
  familyMembers!: FamilyMember[];

  employeeEmergencyInformation: EmployeeEmergencyInformation =
    new EmployeeEmergencyInformation();
  employees!: Employee[];

  constructor(
    private employeeEmergencyInformationService: EmployeeEmergencyInformationService,
    private employeeService: EmployeeService,
    private employeeFamilyService: EmployeeFamilyService,

    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmployeeEmergencyInformations();
    this.getEmployees();
    this.getFamilyMembers();
  }
  getEmployees() {
    this.employeeService.getAll().subscribe({
      next: (response) => {
        this.employees = response.data;
      },
    });
  }
  getFamilyMembers() {
    this.employeeFamilyService.getFamilyMembers().subscribe((response) => {
      this.familyMembers = response.data;
    });
  }
  getEmployeeEmergencyInformations() {
    this.employeeEmergencyInformationService.getAll().subscribe({
      next: (response) => {
        this.employeeEmergencyInformations = response.data;
      },
    });
  }

  getEmployeeEmergencyInformation(id: number) {
    this.employeeEmergencyInformationService.getById(id).subscribe({
      next: (response) => {
        this.employeeEmergencyInformation = response.data;
      },
    });
  }

  save() {
    debugger;
    let message = this.checkValidate();
    if (message != '') {
      this.toastrService.error(message);
      return;
    }
    if (this.employeeEmergencyInformation.id > 0) {
      this.employeeEmergencyInformationService
        .update(this.employeeEmergencyInformation)
        .subscribe({
          next: (response) => {
            this.employeeEmergencyInformation =
              new EmployeeEmergencyInformation();
            this.getEmployeeEmergencyInformations();
            this.toastrService.success(response.message);
          },
          error: (errorResponse) => {
            this.toastrService.error(
              errorResponse.error.Message || errorResponse.error.message
            );
          },
        });
    } else {
      this.employeeEmergencyInformationService
        .add(this.employeeEmergencyInformation)
        .subscribe({
          next: (response) => {
            (this.employeeEmergencyInformation =
              new EmployeeEmergencyInformation()),
              this.getEmployeeEmergencyInformations(),
              this.toastrService.success(response.message);
          },
          error: (errorResponse) => {
            console.log(errorResponse);
            this.toastrService.error(
              errorResponse.error.Message || errorResponse.error.message
            );
          },
        });
    }
  }

  checkValidate(): string {
    let message = '';
    if (
      this.employeeEmergencyInformation.employeeId == null ||
      this.employeeEmergencyInformation.employeeId == undefined
    ) {
      message = 'Çalışan alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeEmergencyInformation.degree == null ||
      this.employeeEmergencyInformation.degree == undefined ||
      this.employeeEmergencyInformation.degree == ''
    ) {
      message = 'Yakınlık derecesi alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeEmergencyInformation.firstName == null ||
      this.employeeEmergencyInformation.firstName == undefined ||
      this.employeeEmergencyInformation.firstName == ''
    ) {
      message = 'Ad alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeEmergencyInformation.lastName == null ||
      this.employeeEmergencyInformation.lastName == undefined ||
      this.employeeEmergencyInformation.lastName == ''
    ) {
      message = 'Soyad alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeEmergencyInformation.phoneNumber == null ||
      this.employeeEmergencyInformation.phoneNumber == undefined ||
      this.employeeEmergencyInformation.phoneNumber == ''
    ) {
      message = 'Telefon numarası alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeEmergencyInformation.priorityValue == null ||
      this.employeeEmergencyInformation.priorityValue == undefined
    ) {
      message = 'Öncelik alanı boş bırakılamaz';
      return message;
    }
    return message;
  }

  delete(employeeEmergencyInformation: EmployeeEmergencyInformation) {
    this.employeeEmergencyInformationService
      .delete(employeeEmergencyInformation)
      .subscribe({
        next: (response) => {
          this.getEmployeeEmergencyInformations();
          this.toastrService.success(response.message);
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error.Message);
        },
      });
  }

  clear() {
    this.employeeEmergencyInformation = new EmployeeEmergencyInformation();
  }
}
