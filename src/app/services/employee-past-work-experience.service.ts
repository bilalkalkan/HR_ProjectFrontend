import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeePastWorkExperience } from '../models/employeePastExperience';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class EmployeePastWorkExperienceService {
  apiUrl = 'https://localhost:44367/api/EmployeePastWorkExperiences/';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<EmployeePastWorkExperience>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<EmployeePastWorkExperience>>(
      newPath
    );
  }

  getById(
    id: number
  ): Observable<SingleResponseModel<EmployeePastWorkExperience>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<EmployeePastWorkExperience>>(
      newPath
    );
  }

  add(
    employeePastExperience: EmployeePastWorkExperience
  ): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, employeePastExperience);
  }

  delete(
    employeePastExperience: EmployeePastWorkExperience
  ): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath, employeePastExperience);
  }

  update(
    employeePastExperience: EmployeePastWorkExperience
  ): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, employeePastExperience);
  }
}
