import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { UserForUpdate } from 'src/app/models/userUpdateModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: UserForUpdate = new UserForUpdate();
  userName!: string;
  email!: string;
  id!: number;
  isAuthenticated!: boolean;
  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private authService: AuthService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.getUser();
    }
  }

  updateUser() {
    this.userService.update(this.user).subscribe((response) => {
      this.toastrService.success(response.message);
    });
  }

  getUserName() {
    this.userName = this.localStorage.getUserNameDecodeToken();
  }
  getUser() {
    let userId = this.localStorage.getIdDecodeToken();
    this.userService.getById(userId).subscribe((response) => {
      this.user = response.data;
    });
  }

  reloadCurrentPage() {
    window.location.reload();
  }
}
