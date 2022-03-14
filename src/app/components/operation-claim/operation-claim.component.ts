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
    if (this.operationClaim.id > 0) {
      this.operationClaimService
        .update(this.operationClaim)
        .subscribe((response) => {
          this.getOperationClaims();
          this.operationClaim = new OperationClaim();
          this.toastrService.success(response.message);
        });
    } else {
      this.operationClaimService
        .add(this.operationClaim)
        .subscribe((response) => {
          this.getOperationClaims();
          this.operationClaim = new OperationClaim();
          this.toastrService.success(response.message);
        });
    }
  }

  saveUserOperationClaim() {
    if (this.userOperationClaim.id > 0) {
      this.userOperationClaimService
        .update(this.userOperationClaim)
        .subscribe((response) => {
          this.getUserOperationClaims();
          this.userOperationClaim = new UserOperationClaim();
          this.toastrService.success(response.message);
        });
    } else {
      this.userOperationClaimService
        .add(this.userOperationClaim)
        .subscribe((response) => {
          this.getUserOperationClaims();
          this.userOperationClaim = new UserOperationClaim();
          this.toastrService.success(response.message);
        });
    }
  }

  deleteOperationClaim(operationClaim: OperationClaim) {
    this.operationClaimService.delete(operationClaim).subscribe((response) => {
      this.getOperationClaims();
      this.toastrService.success(response.message);
    });
  }

  deleteUserOperationClaim(userOperationClaim: UserOperationClaim) {
    this.userOperationClaimService
      .delete(userOperationClaim)
      .subscribe((response) => {
        this.getUserOperationClaims();
        this.toastrService.success(response.message);
      });
  }
}
