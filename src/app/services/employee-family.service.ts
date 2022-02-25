import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeFamily } from '../models/employeeFamily';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class EmployeeFamilyService {
  apıUrl = 'https://localhost:7275/api/EmployeeFamilies/';
  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<ListResponseModel<EmployeeFamily>> {
    let newPath = this.apıUrl + 'getall';
    return this.httpClient.get<ListResponseModel<EmployeeFamily>>(newPath);
  }

  getById(id: number): Observable<SingleResponseModel<EmployeeFamily>> {
    let newPath = this.apıUrl + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<EmployeeFamily>>(newPath);
  }

  add(employeeFamily: EmployeeFamily): Observable<ResponseModel> {
    let newPath = this.apıUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, employeeFamily);
  }

  delete(employeeFamily: EmployeeFamily): Observable<ResponseModel> {
    let newPath = this.apıUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath, employeeFamily);
  }

  update(employeeFamily: EmployeeFamily): Observable<ResponseModel> {
    let newPath = this.apıUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, employeeFamily);
  }
}
