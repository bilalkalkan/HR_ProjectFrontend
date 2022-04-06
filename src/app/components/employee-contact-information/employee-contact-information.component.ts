import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { defineLocale, trLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { City } from 'src/app/models/city';
import { County } from 'src/app/models/county';
import { Employee } from 'src/app/models/employee';
import { EmployeeContactInformation } from 'src/app/models/employeeContactInformation';
import { EmployeeContactInformationService } from 'src/app/services/employee-contact-information.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeecomputerInformationService } from 'src/app/services/employeecomputer-information.service';

@Component({
  selector: 'app-employee-contact-information',
  templateUrl: './employee-contact-information.component.html',
  styleUrls: ['./employee-contact-information.component.css'],
})
export class EmployeeContactInformationComponent implements OnInit {
  employees!: Employee[];
  employeeContactInformations!: EmployeeContactInformation[];
  employeeContactInformation: EmployeeContactInformation =
    new EmployeeContactInformation();
  cities!: City[];
  counties!: County[];
  yes: any = 'Evet';
  no: any = 'Hayır';
  constructor(
    private employeeContactInformationService: EmployeeContactInformationService,
    private employeeService: EmployeeService,
    private toastrService: ToastrService,
    private localeService: BsLocaleService
  ) {
    defineLocale('tr', trLocale);
    this.localeService.use('tr');
  }

  ngOnInit(): void {
    this.getCities();
    this.getEmployess();
    this.getEmployeeContactInformations();
  }

  getEmployess() {
    this.employeeService.getAll().subscribe({
      next: (response) => {
        this.employees = response.data;
      },
    });
  }

  getCities() {
    this.employeeContactInformationService.getCities().subscribe((response) => {
      this.cities = response.data;
    });
  }
  getCounties() {
    this.employeeContactInformationService
      .getCounties()
      .subscribe((response) => {
        this.counties = response.data;
      });
  }
  getCountiesByCityId() {
    this.employeeContactInformationService
      .getcontiesbycityid(this.employeeContactInformation.cityId)
      .subscribe((response) => {
        this.counties = response.data;
      });
  }
  getEmployeeContactInformations() {
    this.employeeContactInformationService.getAll().subscribe({
      next: (response) => {
        this.employeeContactInformations = response.data;
      },
    });
  }

  getEmployeeContactInformation(id: number) {
    this.employeeContactInformationService.getById(id).subscribe({
      next: (reponse) => {
        this.employeeContactInformation = reponse.data;
        this.employeeContactInformation.validityStartSate = new Date(
          this.employeeContactInformation.validityStartSate
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
    if (this.employeeContactInformation.id > 0) {
      this.employeeContactInformationService
        .update(this.employeeContactInformation)
        .subscribe({
          next: (response) => {
            this.employeeContactInformation = new EmployeeContactInformation();
            this.getEmployeeContactInformations();
            this.toastrService.success(response.message);
          },
          error: (errorResponse) => {
            this.toastrService.error(
              errorResponse.error.Message || errorResponse.error.message
            );
          },
        });
    } else {
      this.employeeContactInformationService
        .add(this.employeeContactInformation)
        .subscribe({
          next: (response) => {
            (this.employeeContactInformation =
              new EmployeeContactInformation()),
              this.getEmployeeContactInformations(),
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
      this.employeeContactInformation.employeeId == null ||
      this.employeeContactInformation.employeeId == undefined
    ) {
      message = 'Çalışan alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeContactInformation.validityStartSate == null ||
      this.employeeContactInformation.validityStartSate == undefined
    ) {
      message = 'Geçerlilik Başlangıç Tarihi Alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeContactInformation.adress == null ||
      this.employeeContactInformation.adress == undefined ||
      this.employeeContactInformation.adress == ''
    ) {
      message = 'Adres alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeContactInformation.cityId == null ||
      this.employeeContactInformation.cityId == undefined
    ) {
      message = 'İl alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employeeContactInformation.countyId == null ||
      this.employeeContactInformation.countyId == undefined
    ) {
      message = 'İlçe alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employeeContactInformation.companyPhoneNumber == null ||
      this.employeeContactInformation.companyPhoneNumber == undefined ||
      this.employeeContactInformation.companyPhoneNumber == ''
    ) {
      message = 'Şirket Cep Telefonu alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeContactInformation.companyPhoneNumberShortCode == null ||
      this.employeeContactInformation.companyPhoneNumberShortCode ==
        undefined ||
      this.employeeContactInformation.companyPhoneNumberShortCode == ''
    ) {
      message = 'Şirket Cep Telefonu Kısa Kodu alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeContactInformation.officePhone == null ||
      this.employeeContactInformation.officePhone == undefined ||
      this.employeeContactInformation.officePhone == ''
    ) {
      message = 'Ofis Telefonu alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employeeContactInformation.extensionNumber == null ||
      this.employeeContactInformation == undefined ||
      this.employeeContactInformation.extensionNumber == ''
    ) {
      message = 'Dahili No alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeContactInformation.companyEmail == null ||
      this.employeeContactInformation.companyEmail == undefined ||
      this.employeeContactInformation.companyEmail == ''
    ) {
      message = 'Şirket E-Posta Adresi alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employeeContactInformation.lodgingCode == null ||
      this.employeeContactInformation.lodgingCode == undefined ||
      this.employeeContactInformation.lodgingCode == ''
    ) {
      message = 'Lojman Kodu alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employeeContactInformation.personalPhoneNumber == null ||
      this.employeeContactInformation.personalPhoneNumber == undefined ||
      this.employeeContactInformation.personalPhoneNumber == ''
    ) {
      message = 'Kişisel Cep Telefonu alanı boş bırakılamaz';
      return message;
    }

    if (
      this.employeeContactInformation.homePhone == null ||
      this.employeeContactInformation.homePhone == undefined ||
      this.employeeContactInformation.homePhone == ''
    ) {
      message = 'Ev Telefonu alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeContactInformation.personalEmail == null ||
      this.employeeContactInformation.personalEmail == undefined ||
      this.employeeContactInformation.personalEmail == ''
    ) {
      message = 'Kişisel E-Posta Adresi alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeContactInformation.systemUserName == null ||
      this.employeeContactInformation.systemUserName == undefined ||
      this.employeeContactInformation.systemUserName == ''
    ) {
      message = 'Sistem Kullanıcı Adı alanı boş bırakılamaz';
      return message;
    }
    if (
      this.employeeContactInformation.postCode == null ||
      this.employeeContactInformation.postCode == undefined ||
      this.employeeContactInformation.postCode == ''
    ) {
      message = 'Post Kodu alanı boş bırakılamaz';
      return message;
    }
    return message;
  }

  deleteEmployeContactInformation(
    employeeContactInformation: EmployeeContactInformation
  ) {
    this.employeeContactInformationService
      .delete(employeeContactInformation)
      .subscribe({
        next: (response) => {
          this.getEmployeeContactInformations();
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
    this.employeeContactInformation = new EmployeeContactInformation();
  }
}
