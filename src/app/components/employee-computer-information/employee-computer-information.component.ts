import { Component, OnInit } from '@angular/core';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { EmployeeComputerInformation } from 'src/app/models/employeeComputerInformation';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeecomputerInformationService } from 'src/app/services/employeecomputer-information.service';

@Component({
  selector: 'app-employee-computer-information',
  templateUrl: './employee-computer-information.component.html',
  styleUrls: ['./employee-computer-information.component.css'],
})
export class EmployeeComputerInformationComponent implements OnInit {
  employeeComputerInformations!: EmployeeComputerInformation[];
  employeeComputerInformation: EmployeeComputerInformation =
    new EmployeeComputerInformation();
  employees!: Employee[];
  constructor(
    private employeeComputerInformationService: EmployeecomputerInformationService,
    private employeeService: EmployeeService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this.getEmployeeComputerInformations();
  }
  getEmployees() {
    this.employeeService.getAll().subscribe({
      next: (response) => {
        this.employees = response.data;
      },
    });
  }
  getEmployeeComputerInformations() {
    this.employeeComputerInformationService.getAll().subscribe({
      next: (response) => {
        this.employeeComputerInformations = response.data;
      },
    });
  }

  getEmployeeComputerInformation(id: number) {
    this.employeeComputerInformationService.getById(id).subscribe({
      next: (response) => {
        this.employeeComputerInformation = response.data;
        this.employeeComputerInformation.validityStartSate = new Date(
          this.employeeComputerInformation.validityStartSate
        );
      },
    });
  }

  save() {
    let message = this.validateCheck();
    if (message != '') {
      this.toastrService.error(message);
      return;
    }
    if (this.employeeComputerInformation.id > 0) {
      this.employeeComputerInformationService
        .update(this.employeeComputerInformation)
        .subscribe({
          next: (response) => {
            this.employeeComputerInformation =
              new EmployeeComputerInformation();
            this.getEmployeeComputerInformations();
            this.toastrService.success(response.message);
          },
          error: (errorResponse) => {
            this.toastrService.error(
              errorResponse.error.Message || errorResponse.error.message
            );
          },
        });
    } else {
      this.employeeComputerInformationService
        .add(this.employeeComputerInformation)
        .subscribe({
          next: (response) => {
            (this.employeeComputerInformation =
              new EmployeeComputerInformation()),
              this.getEmployeeComputerInformations(),
              this.toastrService.success(response.message);
          },
          error: (errorResponse) => {
            this.getEmployeeComputerInformations(), console.log(errorResponse);
            this.toastrService.error(
              errorResponse.error.Message || errorResponse.error.message
            );
          },
        });
    }
  }

  validateCheck(): string {
    let message = '';
    if (
      this.employeeComputerInformation.employeeId == null ||
      this.employeeComputerInformation.employeeId == undefined
    ) {
      message = 'Çalışan alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeComputerInformation.validityStartSate == null ||
      this.employeeComputerInformation.validityStartSate == undefined
    ) {
      message = 'Geçerlilik başlangıç tarihi boş bırakılamaz';
      return message;
    }

    if (
      this.employeeComputerInformation.knowledgeName == null ||
      this.employeeComputerInformation.knowledgeName == undefined ||
      this.employeeComputerInformation.knowledgeName == ''
    ) {
      message = 'Yazılım , donanım adı alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employeeComputerInformation.knowledgeLevel == null ||
      this.employeeComputerInformation.knowledgeLevel == undefined ||
      this.employeeComputerInformation.knowledgeLevel == ''
    ) {
      message = 'Bilgi seviyesi alanı boş bırakılamaz';
      return message;
    }
    return message;
  }

  deleteEmployeeComputerInformation(
    employeeComputerInformation: EmployeeComputerInformation
  ) {
    this.employeeComputerInformationService
      .delete(employeeComputerInformation)
      .subscribe({
        next: (response) => {
          this.getEmployeeComputerInformations();
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
    this.employeeComputerInformation = new EmployeeComputerInformation();
  }
}
