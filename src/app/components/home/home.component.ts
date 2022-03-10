import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  isVerified: boolean = false;
  userName!: string;
  constructor(
    private localStorage: LocalStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.IsUserVerified();
    if (this.isVerified) {
      this.getUserName();
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

  logOut() {
    localStorage.removeItem('token');
    this.reloadCurrentPage();
  }

  reloadCurrentPage() {
    window.location.reload();
  }
}
