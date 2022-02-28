import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeVacation } from '../models/employeeVacation';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class EmployeeVacationService {
  apiUrl = 'https://localhost:7275/api/EmployeeVacations/';
  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<ListResponseModel<EmployeeVacation>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<EmployeeVacation>>(newPath);
  }

  get(id: number): Observable<SingleResponseModel<EmployeeVacation>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<EmployeeVacation>>(newPath);
  }

  add(employeeVacation: EmployeeVacation): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, employeeVacation);
  }

  delete(employeeVacation: EmployeeVacation): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath, employeeVacation);
  }

  update(employeeVacation: EmployeeVacation): Observable<ResponseModel> {
    debugger;
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, employeeVacation);
  }
}
