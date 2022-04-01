import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { EmployeeAwardInformation } from 'src/app/models/employeeAwardInformation';
import { EmployeeAwardInformationService } from 'src/app/services/employee-award-information.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-award-information',
  templateUrl: './employee-award-information.component.html',
  styleUrls: ['./employee-award-information.component.css'],
})
export class EmployeeAwardInformationComponent implements OnInit {
  employeeAwardInformations!: EmployeeAwardInformation[];
  employeeAwardInformation: EmployeeAwardInformation =
    new EmployeeAwardInformation();
  employees!: Employee[];
  constructor(
    private employeeService: EmployeeService,
    private employeeAwardInformationService: EmployeeAwardInformationService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this.getEmployeeAwardInformations();
  }

  getEmployeeAwardInformations() {
    this.employeeAwardInformationService.getAll().subscribe({
      next: (response) => {
        this.employeeAwardInformations = response.data;
      },
    });
  }

  getEmployees() {
    this.employeeService.getAll().subscribe({
      next: (response) => {
        this.employees = response.data;
      },
    });
  }

  getEmployeeAwardInformation(id: number) {
    this.employeeAwardInformationService.getById(id).subscribe({
      next: (response) => {
        this.employeeAwardInformation = response.data;
        this.employeeAwardInformation.awardDate = new Date(
          this.employeeAwardInformation.awardDate
        );
      },
    });
  }

  save() {
    let message = this.checkValidate();
    if (message != '') {
      this.toastrService.error(message);
      return;
    }
    if (this.employeeAwardInformation.id > 0) {
      this.employeeAwardInformationService
        .update(this.employeeAwardInformation)
        .subscribe({
          next: (response) => {
            this.employeeAwardInformation = new EmployeeAwardInformation();
            this.getEmployeeAwardInformations();
            this.toastrService.success(response.message);
          },
          error: (errorResponse) => {
            this.toastrService.error(
              errorResponse.error.Message || errorResponse.error.message
            );
          },
        });
    } else {
      this.employeeAwardInformationService
        .add(this.employeeAwardInformation)
        .subscribe({
          next: (response) => {
            this.getEmployeeAwardInformations();
            this.employeeAwardInformation = new EmployeeAwardInformation();
            this.toastrService.success(response.message);
          },
          error: (errorResponse) => {
            console.log(errorResponse.error);
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
      this.employeeAwardInformation.employeeId == null ||
      this.employeeAwardInformation.employeeId == undefined
    ) {
      message = 'Çalışan alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employeeAwardInformation.awardDate == null ||
      this.employeeAwardInformation.awardDate == undefined
    ) {
      message = 'Ödül tarihi alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employeeAwardInformation.awardType == null ||
      this.employeeAwardInformation.awardType == undefined ||
      this.employeeAwardInformation.awardType == ''
    ) {
      message = 'Ödül Türü alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employeeAwardInformation.reasonForAward == null ||
      this.employeeAwardInformation.reasonForAward == undefined ||
      this.employeeAwardInformation.reasonForAward == ''
    ) {
      message = 'Ödül Alma Nedeni alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employeeAwardInformation.costOfThePrize == null ||
      this.employeeAwardInformation.costOfThePrize == undefined ||
      this.employeeAwardInformation.costOfThePrize == ''
    ) {
      message = 'Ödül Maliyeti alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeAwardInformation.awardDescription == null ||
      this.employeeAwardInformation.awardDescription == undefined ||
      this.employeeAwardInformation.awardDescription == ''
    ) {
      message = 'Ödül Açıklaması alanı boş bırakılamaz';
      return message;
    }
    return message;
  }

  deleteEmployeeAwardInformation(
    employeeAwardInformation: EmployeeAwardInformation
  ) {
    this.employeeAwardInformationService
      .delete(employeeAwardInformation)
      .subscribe({
        next: (response) => {
          this.getEmployeeAwardInformations();
          this.toastrService.success(response.message);
        },
        error: (errorResponse) => {
          this.toastrService.error(
            errorResponse.error.Message || errorResponse.error.message
          );
        },
      });
  }

  clear() {
    this.employeeAwardInformation = new EmployeeAwardInformation();
  }
}
