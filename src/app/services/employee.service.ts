import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { ListResponseModel } from '../models/listResponseModel';
import { Nationality } from '../models/nationality';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apıUrl = 'https://localhost:7275/api/employees/';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Employee>> {
    let newPath = this.apıUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Employee>>(newPath);
  }

  getById(id: number): Observable<SingleResponseModel<Employee>> {
    let newPath = this.apıUrl + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Employee>>(newPath);
  }

  add(employee: Employee): Observable<ResponseModel> {
    let newPath = this.apıUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, employee);
  }

  delete(employee: Employee): Observable<ResponseModel> {
    let newPath = this.apıUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath, employee);
  }

  update(employee: Employee): Observable<ResponseModel> {
    let newPath = this.apıUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, employee);
  }

  getNationalities(): Observable<ListResponseModel<Nationality>> {
    let newPath = this.apıUrl + 'getnationalities';
    return this.httpClient.get<ListResponseModel<Nationality>>(newPath);
  }
}
