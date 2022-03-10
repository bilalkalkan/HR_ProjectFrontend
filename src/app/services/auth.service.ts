import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:7275/api/auth/';
  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  login(user: User): Observable<SingleResponseModel<TokenModel>> {
    let newPath = this.apiUrl + 'login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, user);
  }

  register(user: User) {
    let newPath = this.apiUrl + 'register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, user);
  }

  isAuthenticated() {
    let token = this.localStorage.getLocalStorage('token');
    if (token != null) {
      return true;
    } else {
      return false;
    }
  }

  logOuth() {
    this.localStorage.removeLocalStorage('token');
  }
}
