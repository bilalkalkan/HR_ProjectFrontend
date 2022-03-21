import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = new User();
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['home']);
    } else {
      this.router.navigate(['login']);
    }
  }

  login() {
    this.authService.login(this.user).subscribe(
      (response) => {
        this.router.navigate(['/home']);
        this.localStorage.setLocalStorage('token', response.data.token);
        this.toastrService.info('Giriş Yapıldı');
        this.reloadCurrentPage();
      },
      (responseError) => {
        console.log(responseError);
        this.toastrService.error(responseError.error.message);
      }
    );
  }
  reloadCurrentPage() {
    window.location.reload();
  }
}
