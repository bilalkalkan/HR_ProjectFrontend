import { HttpClient } from '@angular/common/http';
import { APP_ID, Injectable } from '@angular/core';
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
  apiUrl = 'https://localhost:7275/api/employees/';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<Employee>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Employee>>(newPath);
  }

  getById(id: number): Observable<SingleResponseModel<Employee>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Employee>>(newPath);
  }

  add(employee: Employee): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, employee);
  }

  delete(employee: Employee): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath, employee);
  }

  update(employee: Employee): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, employee);
  }

  getNationalities(): Observable<ListResponseModel<Nationality>> {
    let newPath = this.apiUrl + 'getnationalities';
    return this.httpClient.get<ListResponseModel<Nationality>>(newPath);
  }
  getNationality(id: number): Observable<SingleResponseModel<Nationality>> {
    let newPat = this.apiUrl + 'getnationality?id=' + id;
    return this.httpClient.get<SingleResponseModel<Nationality>>(newPat);
  }

  addNationality(nationality: Nationality): Observable<ResponseModel> {
    let newPat = this.apiUrl + 'addnationality';
    return this.httpClient.post<ResponseModel>(newPat, nationality);
  }

  deleteNationality(nationality: Nationality): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'deletenationality';
    return this.httpClient.post<ResponseModel>(newPath, nationality);
  }

  updateNationality(nationality: Nationality): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'updatenationality';
    return this.httpClient.post<ResponseModel>(newPath, nationality);
  }
}
