import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { UserForUpdate } from '../models/userUpdateModel';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = 'https://localhost:7275/api/Users/';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<User>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  getById(id: number): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
  getUserDetail(): Observable<SingleResponseModel<User>> {
    let newPath = this.apiUrl + 'getuserdetail';
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
  delete(user: User): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath, user);
  }

  update(user: UserForUpdate): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, user);
  }
}
