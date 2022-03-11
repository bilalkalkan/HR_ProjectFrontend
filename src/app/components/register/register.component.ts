import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {}

  register() {
    this.authService.register(this.user).subscribe(
      (response) => {
        this.toastrService.success('Başarılı');
      },
      (responseError) => {
        console.log(responseError);
        this.toastrService.error(responseError.error);
      }
    );
  }
}
