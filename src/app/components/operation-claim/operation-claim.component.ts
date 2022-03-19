import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OperationClaim } from 'src/app/models/operationClaim';
import { User } from 'src/app/models/user';
import { UserOperationClaim } from 'src/app/models/userOperationClaim';
import { UserOperationClaimDetail } from 'src/app/models/userOperationClaimDto';
import { OperationClaimService } from 'src/app/services/operation-claim.service';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-operation-claim',
  templateUrl: './operation-claim.component.html',
  styleUrls: ['./operation-claim.component.css'],
})
export class OperationClaimComponent implements OnInit {
  operationClaims!: OperationClaim[];
  operationClaim: OperationClaim = new OperationClaim();
  userOperationClaims!: UserOperationClaim[];
  userOperationClaim: UserOperationClaim = new UserOperationClaim();
  userOperationClaimDetails!: UserOperationClaimDetail[];
  users!: User[];
  constructor(
    private operationClaimService: OperationClaimService,
    private userOperationClaimService: UserOperationClaimService,
    private userService: UserService,

    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getOperationClaims();
    this.getUsers();
    this.getUserOperationDetailList();
    this.getUserOperationClaims();
  }
  getUsers() {
    this.userService.getAll().subscribe((response) => {
      this.users = response.data;
    });
  }
  getUserOperationDetailList() {
    this.userOperationClaimService
      .getUserOperationDetailList()
      .subscribe((response) => {
        this.userOperationClaimDetails = response.data;
      });
  }
  getOperationClaims() {
    this.operationClaimService.getAll().subscribe((response) => {
      this.operationClaims = response.data;
    });
  }
  getUserOperationClaims() {
    this.userOperationClaimService.getAll().subscribe((response) => {
      this.userOperationClaims = response.data;
    });
  }

  getOperationClaim(id: number) {
    this.operationClaimService.get(id).subscribe((response) => {
      this.operationClaim = response.data;
    });
  }
  getUserOperationClaim(id: number) {
    this.userOperationClaimService.get(id).subscribe((response) => {
      this.userOperationClaim = response.data;
    });
  }
  saveOperationClaim() {
    let message = this.checkValidateOperationClaim();
    if (message != '') {
      this.toastrService.error(message);
      return;
    }
    if (this.operationClaim.id > 0) {
      this.operationClaimService.update(this.operationClaim).subscribe(
        (response) => {
          this.getOperationClaims();
          this.operationClaim = new OperationClaim();
          this.toastrService.success(response.message);
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error.Message);
        }
      );
    } else {
      this.operationClaimService.add(this.operationClaim).subscribe(
        (response) => {
          this.getOperationClaims();
          this.operationClaim = new OperationClaim();
          this.toastrService.success(response.message);
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error.Message);
        }
      );
    }
  }

  saveUserOperationClaim() {
    let message = this.checkUserValidateOperationClaim();
    if (message != '') {
      this.toastrService.error(message);
      return;
    }
    if (this.userOperationClaim.id > 0) {
      this.userOperationClaimService.update(this.userOperationClaim).subscribe(
        (response) => {
          this.getUserOperationClaims();
          this.userOperationClaim = new UserOperationClaim();
          this.toastrService.success(response.message);
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error.Message);
        }
      );
    } else {
      this.userOperationClaimService.add(this.userOperationClaim).subscribe(
        (response) => {
          this.getUserOperationClaims();
          this.userOperationClaim = new UserOperationClaim();
          this.toastrService.success(response.message);
        },
        (errorResponse) => {
          this.toastrService.error(errorResponse.error.Message);
        }
      );
    }
  }

  deleteOperationClaim(operationClaim: OperationClaim) {
    this.operationClaimService.delete(operationClaim).subscribe(
      (response) => {
        this.getOperationClaims();
        this.toastrService.success(response.message);
      },
      (errorResponse) => {
        console.log(errorResponse.error.Message);
      }
    );
  }

  deleteUserOperationClaim(userOperationClaim: UserOperationClaim) {
    this.userOperationClaimService.delete(userOperationClaim).subscribe(
      (response) => {
        this.getUserOperationClaims();
        this.toastrService.success(response.message);
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.Message);
      }
    );
  }

  checkValidateOperationClaim(): string {
    let message = '';
    if (
      this.operationClaim.name == null ||
      this.operationClaim.name == undefined ||
      this.operationClaim.name == ''
    ) {
      message = 'Rol alanı boş bırakılamaz';
      return message;
    }
    return message;
  }

  checkUserValidateOperationClaim(): string {
    let message = '';
    if (
      this.userOperationClaim.operationClaimId == null ||
      this.userOperationClaim.operationClaimId == undefined
    ) {
      message = 'Rol alanı boş bırakılamaz';
      return message;
    }
    if (
      this.userOperationClaim.userId == null ||
      this.userOperationClaim.userId == undefined
    ) {
      message = 'Kullanıcı alanı boş bırakılamaz';
      return message;
    }
    return message;
  }

  clearOperationClaimTextBox() {
    this.operationClaim = new OperationClaim();
  }
  claerUserOperationClaimTextBox() {
    this.userOperationClaim = new UserOperationClaim();
  }
}
