import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeAwardInformation } from '../models/employeeAwardInformation';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

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

  getById(
    id: number
  ): Observable<SingleResponseModel<EmployeeAwardInformation>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<EmployeeAwardInformation>>(
      newPath
    );
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
  delete(
    employeeAwardInformation: EmployeeAwardInformation
  ): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(
      newPath,
      employeeAwardInformation
    );
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
}
