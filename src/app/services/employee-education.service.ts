import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EducationLevel } from '../models/educationLevel';
import { EmployeeEducation } from '../models/employeeEducation';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class EmployeeEducationService {
  apiUrl = 'https://localhost:7275/api/EmployeeEducations/';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<EmployeeEducation>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<EmployeeEducation>>(newPath);
  }

  getById(id: number): Observable<SingleResponseModel<EmployeeEducation>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<EmployeeEducation>>(newPath);
  }

  add(employeeEducation: EmployeeEducation): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, employeeEducation);
  }

  delete(employeeEducation: EmployeeEducation): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath, employeeEducation);
  }

  update(employeeEducation: EmployeeEducation): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, employeeEducation);
  }
  getEducationLevels(): Observable<ListResponseModel<EducationLevel>> {
    let newPath = this.apiUrl + 'geteducationlevels';
    return this.httpClient.get<ListResponseModel<EducationLevel>>(newPath);
  }

  getEducationLevel(
    id: number
  ): Observable<SingleResponseModel<EducationLevel>> {
    let newPath = this.apiUrl + 'geteducation?id=' + id;
    return this.httpClient.get<SingleResponseModel<EducationLevel>>(newPath);
  }

  addEducationLevel(educationLevel: EducationLevel): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'addeducationlevel';
    return this.httpClient.post<ResponseModel>(newPath, educationLevel);
  }

  deleteEducationLevel(
    educationLevel: EducationLevel
  ): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'deleteeducationlevel';
    return this.httpClient.post<ResponseModel>(newPath, educationLevel);
  }

  updateEducationLevel(
    educationLevel: EducationLevel
  ): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'updateeducationlevel';
    return this.httpClient.post<ResponseModel>(newPath, educationLevel);
  }
}
