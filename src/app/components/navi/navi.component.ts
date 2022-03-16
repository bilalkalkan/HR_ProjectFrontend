import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  claims!: string;
  isVerified: boolean = false;
  userName!: string;
  id!: number;
  constructor(
    private localStorage: LocalStorageService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
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
    this.router.navigate(['login']);
  }
  reloadCurrentPage() {
    window.location.reload();
  }
}
