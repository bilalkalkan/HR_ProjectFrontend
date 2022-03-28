import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city';
import { County } from '../models/county';
import { EmployeeContactInformation } from '../models/employeeContactInformation';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class EmployeeContactInformationService {
  apiUrl = 'https://localhost:44367/api/EmployeeContactInformations/';

  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<ListResponseModel<EmployeeContactInformation>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<EmployeeContactInformation>>(
      newPath
    );
  }

  getById(
    id: number
  ): Observable<SingleResponseModel<EmployeeContactInformation>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<EmployeeContactInformation>>(
      newPath
    );
  }

  getCities(): Observable<ListResponseModel<City>> {
    let newPath = this.apiUrl + 'getcities';
    return this.httpClient.get<ListResponseModel<City>>(newPath);
  }
  getCounties(): Observable<ListResponseModel<County>> {
    let newPath = this.apiUrl + 'getcounties';
    return this.httpClient.get<ListResponseModel<County>>(newPath);
  }

  getcontiesbycityid(id: number): Observable<ListResponseModel<County>> {
    let newPath = this.apiUrl + 'getcontiesbycityid?cityId=' + id;
    return this.httpClient.get<ListResponseModel<County>>(newPath);
  }

  add(
    employeeContactInformation: EmployeeContactInformation
  ): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(
      newPath,
      employeeContactInformation
    );
  }

  delete(
    employeeContactInformation: EmployeeContactInformation
  ): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(
      newPath,
      employeeContactInformation
    );
  }

  update(
    employeeContactInformation: EmployeeContactInformation
  ): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(
      newPath,
      employeeContactInformation
    );
  }
}
