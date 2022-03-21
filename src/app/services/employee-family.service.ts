import { HttpClient } from '@angular/common/http';
import { APP_ID, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeFamily } from '../models/employeeFamily';
import { FamilyMember } from '../models/familyMember';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class EmployeeFamilyService {
  apiUrl = 'https://localhost:44367/api/EmployeeFamilies/';
  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<ListResponseModel<EmployeeFamily>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<EmployeeFamily>>(newPath);
  }

  getById(id: number): Observable<SingleResponseModel<EmployeeFamily>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<EmployeeFamily>>(newPath);
  }

  add(employeeFamily: EmployeeFamily): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, employeeFamily);
  }

  delete(employeeFamily: EmployeeFamily): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath, employeeFamily);
  }

  update(employeeFamily: EmployeeFamily): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, employeeFamily);
  }

  getFamilyMembers(): Observable<ListResponseModel<FamilyMember>> {
    let newPath = this.apiUrl + 'getfamilymembers';
    return this.httpClient.get<ListResponseModel<FamilyMember>>(newPath);
  }
  getFamilyMember(id: number): Observable<SingleResponseModel<FamilyMember>> {
    let newPath = this.apiUrl + 'getfamilymember?id=' + id;
    return this.httpClient.get<SingleResponseModel<FamilyMember>>(newPath);
  }

  addFamilyMember(familyMember: FamilyMember): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'addfamilymember';
    return this.httpClient.post<ResponseModel>(newPath, familyMember);
  }

  deleteFamilyMember(familyMember: FamilyMember): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'deletefamilymember';
    return this.httpClient.post<ResponseModel>(newPath, familyMember);
  }

  updateFamilyMember(familyMember: FamilyMember): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'updatefamilymember';
    return this.httpClient.post<ResponseModel>(newPath, familyMember);
  }
}
