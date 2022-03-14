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
  apıUrl = 'https://localhost:44367/api/EmployeeFamilies/';
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

  getFamilyMembers(): Observable<ListResponseModel<FamilyMember>> {
    let newPath = this.apıUrl + 'getfamilymembers';
    return this.httpClient.get<ListResponseModel<FamilyMember>>(newPath);
  }
  getFamilyMember(id: number): Observable<SingleResponseModel<FamilyMember>> {
    let newPath = this.apıUrl + 'getfamilymember?id=' + id;
    return this.httpClient.get<SingleResponseModel<FamilyMember>>(newPath);
  }

  addFamilyMember(familyMember: FamilyMember): Observable<ResponseModel> {
    let newPath = this.apıUrl + 'addfamilymember';
    return this.httpClient.post<ResponseModel>(newPath, familyMember);
  }

  deleteFamilyMember(familyMember: FamilyMember): Observable<ResponseModel> {
    let newPath = this.apıUrl + 'deletefamilymember';
    return this.httpClient.post<ResponseModel>(newPath, familyMember);
  }

  updateFamilyMember(familyMember: FamilyMember): Observable<ResponseModel> {
    let newPath = this.apıUrl + 'updatefamilymember';
    return this.httpClient.post<ResponseModel>(newPath, familyMember);
  }
}
