import { Component, OnInit } from '@angular/core';
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
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService.login(this.user).subscribe(
      (response) => {
        this.localStorage.setLocalStorage('token', response.data.token);
        this.reloadCurrentPage();
        this.toastrService.info('Giriş Yapıldı');
      },
      (responseError) => {
        console.log(responseError);
        this.toastrService.error(responseError.error);
      }
    );
  }

  reloadCurrentPage() {
    window.location.reload();
  }
}
