import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DebitType } from '../models/debitType';
import { EmployeeDebit } from '../models/employeeDebit';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class EmployeeDebitService {
  apiUrl = 'https://localhost:7275/api/EmployeeDebits/';
  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<ListResponseModel<EmployeeDebit>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<EmployeeDebit>>(newPath);
  }

  get(id: number): Observable<SingleResponseModel<EmployeeDebit>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<EmployeeDebit>>(newPath);
  }

  add(employeeDebit: EmployeeDebit): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, employeeDebit);
  }

  delete(employeeDebit: EmployeeDebit): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath, employeeDebit);
  }

  update(employeeDebit: EmployeeDebit): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, employeeDebit);
  }

  getDebitTypes(): Observable<ListResponseModel<DebitType>> {
    let newPath = this.apiUrl + 'getdebittypes';
    return this.httpClient.get<ListResponseModel<DebitType>>(newPath);
  }
  getDebitType(id: number): Observable<SingleResponseModel<DebitType>> {
    let newPath = this.apiUrl + 'getdebittype?id=' + id;
    return this.httpClient.get<SingleResponseModel<DebitType>>(newPath);
  }
  addDebitType(debitType: DebitType): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'adddetbittype';
    return this.httpClient.post<ResponseModel>(newPath, debitType);
  }
  deleteDebitType(debitType: DebitType): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'deletedetbittype';
    return this.httpClient.post<ResponseModel>(newPath, debitType);
  }

  updateDebitType(debitType: DebitType): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'updatedetbittype';
    return this.httpClient.post<ResponseModel>(newPath, debitType);
  }
}
