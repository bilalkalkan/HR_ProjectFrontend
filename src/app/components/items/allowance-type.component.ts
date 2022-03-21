import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AllowanceType } from 'src/app/models/allowanceType';
import { DebitType } from 'src/app/models/debitType';
import { EducationLevel } from 'src/app/models/educationLevel';
import { EmployeeLanguage } from 'src/app/models/employeeLanguage';
import { FamilyMember } from 'src/app/models/familyMember';
import { Language } from 'src/app/models/language';
import { Nationality } from 'src/app/models/nationality';
import { EmployeeDebitService } from 'src/app/services/employee-debit.service';
import { EmployeeEducationService } from 'src/app/services/employee-education.service';
import { EmployeeFamilyService } from 'src/app/services/employee-family.service';
import { EmployeeLanguageService } from 'src/app/services/employee-language.service';
import { EmployeeVacationService } from 'src/app/services/employee-vacation.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-allowance-type',
  templateUrl: './allowance-type.component.html',
  styleUrls: ['./allowance-type.component.css'],
})
export class AllowanceTypeComponent implements OnInit {
  allowanceTypes!: AllowanceType[];
  allowanceType: AllowanceType = new AllowanceType();
  debitTypes!: DebitType[];
  debitType: DebitType = new DebitType();
  educationaLevels!: EducationLevel[];
  educationaLevel: EducationLevel = new EducationLevel();
  languages!: Language[];
  language: Language = new Language();
  familyMembers!: FamilyMember[];
  familyMember: FamilyMember = new FamilyMember();
  nationalities!: Nationality[];
  nationality: Nationality = new Nationality();
  constructor(
    private employeeVacationService: EmployeeVacationService,
    private employeeDebitService: EmployeeDebitService,
    private employeeEducationService: EmployeeEducationService,
    private employeeLanguageService: EmployeeLanguageService,
    private employeeFamilyService: EmployeeFamilyService,
    private employeeService: EmployeeService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllowanceTypes();
    this.getDebitTypes();
    this.getLanguages();
    this.getEducationLevels();
    this.getFamilyMembers();
    this.getNationalities();
  }

  getAllowanceTypes() {
    this.employeeVacationService.getAllowanceTypes().subscribe((response) => {
      this.allowanceTypes = response.data;
    });
  }
  getAllowanceType(id: number) {
    this.employeeVacationService.getAllowanceType(id).subscribe((response) => {
      this.allowanceType = response.data;
    });
  }
  getEducationLevels() {
    this.employeeEducationService.getEducationLevels().subscribe((response) => {
      this.educationaLevels = response.data;
    });
  }
  getEducationLevel(id: number) {
    this.employeeEducationService
      .getEducationLevel(id)
      .subscribe((response) => {
        this.educationaLevel = response.data;
      });
  }
  getDebitTypes() {
    this.employeeDebitService.getDebitTypes().subscribe((response) => {
      this.debitTypes = response.data;
    });
  }
  getDebitType(id: number) {
    this.employeeDebitService.getDebitType(id).subscribe((response) => {
      this.debitType = response.data;
    });
  }

  getLanguages() {
    this.employeeLanguageService.getLanguages().subscribe((response) => {
      this.languages = response.data;
    });
  }
  getLanguage(id: number) {
    this.employeeLanguageService.getLanguage(id).subscribe((response) => {
      this.language = response.data;
    });
  }

  getFamilyMembers() {
    this.employeeFamilyService.getFamilyMembers().subscribe((response) => {
      this.familyMembers = response.data;
    });
  }
  getFamilyMember(id: number) {
    this.employeeFamilyService.getFamilyMember(id).subscribe((response) => {
      this.familyMember = response.data;
    });
  }
  getNationalities() {
    this.employeeService.getNationalities().subscribe((response) => {
      this.nationalities = response.data;
    });
  }

  getNationality(id: number) {
    this.employeeService.getNationality(id).subscribe((response) => {
      this.nationality = response.data;
    });
  }
  saveAllowanceType() {
    let message = this.validateAllowanceType();
    if (message != '') {
      this.toastrService.error(message);
      return;
    }
    if (this.allowanceType.id > 0) {
      this.employeeVacationService
        .updateAllowanceType(this.allowanceType)
        .subscribe(
          (response) => {
            this.getAllowanceTypes();
            this.allowanceType = new AllowanceType();
            this.toastrService.success(response.message);
          },
          (errorResponse) => {
            this.toastrService.error(errorResponse.error.Message);
          }
        );
    } else {
      this.employeeVacationService
        .addAllowanceType(this.allowanceType)
        .subscribe(
          (response) => {
            this.getAllowanceTypes();
            this.allowanceType = new AllowanceType();
            this.toastrService.success(response.message);
          },
          (errorResponse) => {
            this.toastrService.error(errorResponse.error.Message);
          }
        );
    }
  }
  validateAllowanceType(): string {
    let message = '';
    if (
      this.allowanceType.allowanceTypeName == null ||
      this.allowanceType.allowanceTypeName == undefined ||
      this.allowanceType.allowanceTypeName == ''
    ) {
      message = 'İzin türü alanı boş bırakılamaz';
      return message;
    }
    return message;
  }

  saveDebitType() {
    let message = this.validateDebitType();
    if (message != '') {
      this.toastrService.error(message);
      return;
    }
    if (this.debitType.id > 0) {
      this.employeeDebitService.updateDebitType(this.debitType).subscribe(
        (response) => {
          this.getDebitTypes();
          this.debitType = new DebitType();
          this.toastrService.success(response.message);
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error.Message);
        }
      );
    } else {
      this.employeeDebitService.addDebitType(this.debitType).subscribe(
        (response) => {
          this.getDebitTypes();
          this.debitType = new DebitType();
          this.toastrService.success(response.message);
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error.Message);
        }
      );
    }
  }
  validateDebitType(): string {
    let message = '';
    if (
      this.debitType.debitTypeName == null ||
      this.debitType.debitTypeName == undefined ||
      this.debitType.debitTypeName == ''
    ) {
      message = 'Zimmet türü alanı boş bırakılamaz';
      return message;
    }
    return message;
  }
  saveEducationLevel() {
    let message = this.validateEducationLevel();
    if (message != '') {
      this.toastrService.error(message);
      return;
    }
    if (this.educationaLevel.id > 0) {
      this.employeeEducationService
        .updateEducationLevel(this.educationaLevel)
        .subscribe(
          (response) => {
            this.getEducationLevels();
            this.educationaLevel = new EducationLevel();
            this.toastrService.success(response.message);
          },
          (errorResponse) => {
            this.toastrService.error(errorResponse.error.Message);
          }
        );
    } else {
      this.employeeEducationService
        .addEducationLevel(this.educationaLevel)
        .subscribe(
          (response) => {
            this.getEducationLevels();
            this.educationaLevel = new EducationLevel();
            this.toastrService.success(response.message);
          },
          (errorResponse) => {
            this.toastrService.error(errorResponse.error.Message);
          }
        );
    }
  }
  validateEducationLevel(): string {
    let message = '';
    if (
      this.educationaLevel.educationaLevelName == null ||
      this.educationaLevel.educationaLevelName == undefined ||
      this.educationaLevel.educationaLevelName == ''
    ) {
      message = 'Eğitim seviyesi alanı boş bırakılamaz';
      return message;
    }
    return message;
  }
  saveLanguage() {
    let message = this.validateLanguage();
    if (message != '') {
      this.toastrService.error(message);
      return;
    }
    if (this.language.id > 0) {
      this.employeeLanguageService.updateLanguage(this.language).subscribe(
        (response) => {
          this.getLanguages();
          this.language = new Language();
          this.toastrService.success(response.message);
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error.Message);
        }
      );
    } else {
      this.employeeLanguageService.addLanguage(this.language).subscribe(
        (response) => {
          this.getLanguages();
          this.language = new Language();
          this.toastrService.success(response.message);
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error.Message);
        }
      );
    }
  }

  validateLanguage(): string {
    let message = '';
    if (
      this.language.nameOfLanguage == null ||
      this.language.nameOfLanguage == undefined ||
      this.language.nameOfLanguage == ''
    ) {
      message = 'Yabancı dil alanı boş bırakılamaz';
      return message;
    }
    return message;
  }

  saveFamilyMember() {
    let message = this.validateFamilyMember();
    if (message != '') {
      this.toastrService.error(message);
      return;
    }
    if (this.familyMember.id > 0) {
      this.employeeFamilyService
        .updateFamilyMember(this.familyMember)
        .subscribe(
          (response) => {
            this.getFamilyMembers();
            this.familyMember = new FamilyMember();
            this.toastrService.success(response.message);
          },
          (errorResponse) => {
            this.toastrService.error(errorResponse.error.Message);
          }
        );
    } else {
      this.employeeFamilyService.addFamilyMember(this.familyMember).subscribe(
        (response) => {
          this.getFamilyMembers();
          this.familyMember = new FamilyMember();
          this.toastrService.success(response.message);
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error.Message);
        }
      );
    }
  }

  validateFamilyMember(): string {
    let message = '';
    if (
      this.familyMember.member == null ||
      this.familyMember.member == undefined ||
      this.familyMember.member == ''
    ) {
      message = 'Aile üyesi alanı boş bırakılamaz';
      return message;
    }
    return message;
  }

  saveNationality() {
    let message = this.validateNationality();
    if (message != '') {
      this.toastrService.error(message);
      return;
    }
    if (this.nationality.id > 0) {
      this.employeeService.updateNationality(this.nationality).subscribe(
        (response) => {
          this.getNationalities();
          this.nationality = new Nationality();
          this.toastrService.success(response.message);
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error.Message);
        }
      );
    } else {
      this.employeeService.addNationality(this.nationality).subscribe(
        (response) => {
          this.getNationalities();
          this.nationality = new Nationality();
          this.toastrService.success(response.message);
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error.Message);
        }
      );
    }
  }

  validateNationality(): string {
    let message = '';
    if (
      this.nationality.nationalityName == null ||
      this.nationality == undefined ||
      this.nationality.nationalityName == ''
    ) {
      message = 'Uyruk alanı boş bırakılamaz';
      return message;
    }
    return message;
  }

  deleteAllowanceType(allowanceType: AllowanceType) {
    this.employeeVacationService.deleteAllowanceType(allowanceType).subscribe(
      (response) => {
        this.getAllowanceTypes();
        this.toastrService.success(response.message);
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.Message);
      }
    );
  }

  deleteDebitType(debitType: DebitType) {
    this.employeeDebitService.deleteDebitType(debitType).subscribe(
      (response) => {
        this.getDebitTypes();
        this.toastrService.success(response.message);
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.Message);
      }
    );
  }

  deleteEducationLevel(educationaLevel: EducationLevel) {
    this.employeeEducationService
      .deleteEducationLevel(educationaLevel)
      .subscribe(
        (response) => {
          this.getEducationLevels();
          this.toastrService.success(response.message);
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error.Message);
        }
      );
  }

  deleteNationality(nationality: Nationality) {
    this.employeeService.deleteNationality(nationality).subscribe(
      (response) => {
        this.getNationalities();
        this.toastrService.success(response.message);
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.Message);
      }
    );
  }
  deleteLanguage(language: Language) {
    this.employeeLanguageService.deleteLanguage(language).subscribe(
      (response) => {
        this.getLanguages();
        this.toastrService.success(response.message);
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.Message);
      }
    );
  }

  deleteFamilyMember(familyMember: FamilyMember) {
    this.employeeFamilyService.deleteFamilyMember(familyMember).subscribe(
      (response) => {
        this.getFamilyMembers();
        this.toastrService.success(response.message);
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.Message);
      }
    );
  }
}
