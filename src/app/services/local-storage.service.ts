import { JsonpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  setLocalStorage(key: string, value: string) {
    return localStorage.setItem(key, value);
  }

  removeLocalStorage(key: string) {
    return localStorage.removeItem(key);
  }

  getUserNameDecodeToken() {
    let token = JSON.parse(this.getLocalStorage('token') || '{}');
    let name: string = String(Object.values(jwtDecode(token))[2]);
    return name;
  }
}
