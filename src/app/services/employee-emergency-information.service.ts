import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeEmergencyInformation } from '../models/employeeEmergencyInformation';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class EmployeeEmergencyInformationService {
  apiUrl = 'https://localhost:44367/api/EmployeeEmergencyInformations/';

  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<ListResponseModel<EmployeeEmergencyInformation>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<EmployeeEmergencyInformation>>(
      newPath
    );
  }

  getById(
    id: number
  ): Observable<SingleResponseModel<EmployeeEmergencyInformation>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.httpClient.get<
      SingleResponseModel<EmployeeEmergencyInformation>
    >(newPath);
  }

  add(
    employeeEmergencyInformation: EmployeeEmergencyInformation
  ): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(
      newPath,
      employeeEmergencyInformation
    );
  }

  delete(
    employeeEmergencyInformation: EmployeeEmergencyInformation
  ): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(
      newPath,
      employeeEmergencyInformation
    );
  }

  update(
    employeeEmergencyInformation: EmployeeEmergencyInformation
  ): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(
      newPath,
      employeeEmergencyInformation
    );
  }
}
