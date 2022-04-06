import { Component, OnInit } from '@angular/core';
import { defineLocale, trLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { EmployeePastWorkExperience } from 'src/app/models/employeePastExperience';
import { EmployeePastWorkExperienceService } from 'src/app/services/employee-past-work-experience.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-past-work-experience',
  templateUrl: './employee-past-work-experience.component.html',
  styleUrls: ['./employee-past-work-experience.component.css'],
})
export class EmployeePastWorkExperienceComponent implements OnInit {
  employeePastWorkExperiences!: EmployeePastWorkExperience[];
  employeePastWorkExperience: EmployeePastWorkExperience =
    new EmployeePastWorkExperience();
  yes: any = 'Evet';
  no: any = 'Hayır';
  employees!: Employee[];
  constructor(
    private employeePastWorkExperienceService: EmployeePastWorkExperienceService,
    private employeeService: EmployeeService,
    private localeService: BsLocaleService,
    private toastrService: ToastrService
  ) {
    defineLocale('tr', trLocale);
    this.localeService.use('tr');
  }

  ngOnInit(): void {
    this.getEmployees();
    this.getEmployeePastWorkExperiences();
  }

  getEmployees() {
    this.employeeService.getAll().subscribe({
      next: (response) => {
        this.employees = response.data;
      },
    });
  }

  getEmployeePastWorkExperiences() {
    this.employeePastWorkExperienceService.getAll().subscribe({
      next: (response) => {
        this.employeePastWorkExperiences = response.data;
      },
    });
  }

  getEmployeePastWorkExperience(id: number) {
    this.employeePastWorkExperienceService.getById(id).subscribe({
      next: (response) => {
        this.employeePastWorkExperience = response.data;
        this.employeePastWorkExperience.entryDate = new Date(
          this.employeePastWorkExperience.entryDate
        );
        this.employeePastWorkExperience.releaseDate = new Date(
          this.employeePastWorkExperience.releaseDate
        );
      },
    });
  }

  save() {
    let message = this.validateCheck();
    if (message != '') {
      this.toastrService.error(message);
      return;
    } else {
      if (this.employeePastWorkExperience.id > 0) {
        this.employeePastWorkExperienceService
          .update(this.employeePastWorkExperience)
          .subscribe({
            next: (response) => {
              this.employeePastWorkExperience =
                new EmployeePastWorkExperience();
              this.getEmployeePastWorkExperiences();
              this.toastrService.success(response.message);
            },

            error: (errorResponse) => {
              console.log(errorResponse.error);
              this.toastrService.error(
                errorResponse.error.Message || errorResponse.error.message
              );
            },
          });
      } else {
        this.employeePastWorkExperienceService
          .add(this.employeePastWorkExperience)
          .subscribe({
            next: (response) => {
              this.getEmployeePastWorkExperiences();
              this.employeePastWorkExperience =
                new EmployeePastWorkExperience();
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
  }
  validateCheck(): string {
    let message = '';
    if (
      this.employeePastWorkExperience.employeeId == null ||
      this.employeePastWorkExperience.employeeId == undefined
    ) {
      message = 'Çalışan alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeePastWorkExperience.companyName == null ||
      this.employeePastWorkExperience.companyName == undefined ||
      this.employeePastWorkExperience.companyName == ''
    ) {
      message = 'Şirket/Kurum Adı boş bırakılamaz';
      return message;
    }
    if (
      this.employeePastWorkExperience.department == null ||
      this.employeePastWorkExperience.department == undefined ||
      this.employeePastWorkExperience.department == ''
    ) {
      message = 'Departma alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeePastWorkExperience.duty == null ||
      this.employeePastWorkExperience.duty == undefined ||
      this.employeePastWorkExperience.duty == ''
    ) {
      message = 'Görev alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeePastWorkExperience.entryDate == null ||
      this.employeePastWorkExperience.entryDate == undefined
    ) {
      message = 'Giriş Tarihi alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeePastWorkExperience.releaseDate == null ||
      this.employeePastWorkExperience.releaseDate == undefined
    ) {
      message = 'Çıkış Tarihi alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employeePastWorkExperience.reasonForLeaving == null ||
      this.employeePastWorkExperience.reasonForLeaving == undefined ||
      this.employeePastWorkExperience.reasonForLeaving == ''
    ) {
      message = 'Ayrılma Nedeni alanı boş bırakılamaz';
      return message;
    }
    return message;
  }
  deleteEmployeePastWorkExperiences(
    employeePastExperience: EmployeePastWorkExperience
  ) {
    this.employeePastWorkExperienceService
      .delete(employeePastExperience)
      .subscribe({
        next: (response) => {
          this.getEmployeePastWorkExperiences();
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
    this.employeePastWorkExperience = new EmployeePastWorkExperience();
  }
}
