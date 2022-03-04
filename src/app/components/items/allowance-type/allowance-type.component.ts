import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AllowanceType } from 'src/app/models/allowanceType';
import { EmployeeVacationService } from 'src/app/services/employee-vacation.service';

@Component({
  selector: 'app-allowance-type',
  templateUrl: './allowance-type.component.html',
  styleUrls: ['./allowance-type.component.css'],
})
export class AllowanceTypeComponent implements OnInit {
  allowanceTypes!: AllowanceType[];
  allowanceType: AllowanceType = new AllowanceType();
  constructor(
    private employeeVacationService: EmployeeVacationService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllowanceTypes();
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

  save() {
    if (this.allowanceType.id > 0) {
      this.employeeVacationService
        .updateAllowanceType(this.allowanceType)
        .subscribe((response) => {
          this.toastrService.success(response.message);
        });
    }
    this.employeeVacationService
      .addAllowanceType(this.allowanceType)
      .subscribe((response) => {
        this.toastrService.success(response.message);
      });
  }

  deleteAllowanceType(allowanceType: AllowanceType) {
    this.employeeVacationService
      .deleteAllowanceType(allowanceType)
      .subscribe((response) => {
        this.toastrService.success(response.message);
      });
  }
}
