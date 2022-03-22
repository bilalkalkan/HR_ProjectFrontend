import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { EmployeeComputerInformation } from '../models/employeeComputerInformation';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class EmployeecomputerInformationService {
  apiUrl = 'https://localhost:44367/api/EmployeeComputerInformations/';

  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<ListResponseModel<EmployeeComputerInformation>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<EmployeeComputerInformation>>(
      newPath
    );
  }

  getById(
    id: number
  ): Observable<SingleResponseModel<EmployeeComputerInformation>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.httpClient.get<
      SingleResponseModel<EmployeeComputerInformation>
    >(newPath);
  }

  add(
    employeeComputerInformation: EmployeeComputerInformation
  ): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(
      newPath,
      employeeComputerInformation
    );
  }

  delete(
    employeeComputerInformation: EmployeeComputerInformation
  ): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(
      newPath,
      employeeComputerInformation
    );
  }

  update(
    employeeComputerInformation: EmployeeComputerInformation
  ): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(
      newPath,
      employeeComputerInformation
    );
  }
}
