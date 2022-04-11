import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeAwardInformation } from '../models/employeeAwardInformation';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TypeOfAward } from '../models/typeOfAward';

@Injectable({
  providedIn: 'root',
})
export class EmployeeAwardInformationService {
  apiUrl = 'https://localhost:44367/api/EmployeeAwardInformations/';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<EmployeeAwardInformation>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<EmployeeAwardInformation>>(
      newPath
    );
  }
  getTypeOfAwards(): Observable<ListResponseModel<TypeOfAward>> {
    let newPath = this.apiUrl + 'gettypeofawards';
    return this.httpClient.get<ListResponseModel<TypeOfAward>>(newPath);
  }
  getById(
    id: number
  ): Observable<SingleResponseModel<EmployeeAwardInformation>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<EmployeeAwardInformation>>(
      newPath
    );
  }

  getTypeOfAward(id: number): Observable<SingleResponseModel<TypeOfAward>> {
    let newPath = this.apiUrl + 'gettypeofaward?id=' + id;
    return this.httpClient.get<SingleResponseModel<TypeOfAward>>(newPath);
  }

  add(
    employeeAwardInformation: EmployeeAwardInformation
  ): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(
      newPath,
      employeeAwardInformation
    );
  }
  addtypeOfAward(typeOfAward: TypeOfAward): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'addtypeofaward';
    return this.httpClient.post<ResponseModel>(newPath, typeOfAward);
  }

  delete(
    employeeAwardInformation: EmployeeAwardInformation
  ): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(
      newPath,
      employeeAwardInformation
    );
  }
  deletetypeOfAward(typeOfAward: TypeOfAward): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'deletetypeofaward';
    return this.httpClient.post<ResponseModel>(newPath, typeOfAward);
  }

  update(
    employeeAwardInformation: EmployeeAwardInformation
  ): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(
      newPath,
      employeeAwardInformation
    );
  }

  updatetypeOfAward(typeOfAward: TypeOfAward): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'updatetypeofaward';
    return this.httpClient.post<ResponseModel>(newPath, typeOfAward);
  }
}
