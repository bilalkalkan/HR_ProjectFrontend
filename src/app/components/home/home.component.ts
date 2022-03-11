import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  claims!: string;
  isVerified: boolean = false;
  userName!: string;
  id!: number;
  constructor(
    private localStorage: LocalStorageService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.IsUserVerified();
    if (this.isVerified) {
      this.getUserName();
      this.getClaims();
      this.getId();
    }
  }

  IsUserVerified() {
    if (this.authService.isAuthenticated()) {
      this.isVerified = true;
    } else {
      this.isVerified = false;
    }
  }
  getUserName() {
    this.userName = this.localStorage.getUserNameDecodeToken();
  }
  getId() {
    this.id = this.localStorage.getIdDecodeToken();
  }
  getClaims() {
    this.claims = this.localStorage.getClaimsDecodeToken();
  }
  logOut() {
    localStorage.removeItem('token');
    this.reloadCurrentPage();
  }
  reloadCurrentPage() {
    window.location.reload();
  }
}
