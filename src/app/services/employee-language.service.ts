import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeLanguage } from '../models/employeeLanguage';
import { Language } from '../models/language';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class EmployeeLanguageService {
  apiUrl = 'https://localhost:7275/api/EmployeeLanguages/';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<EmployeeLanguage>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<EmployeeLanguage>>(newPath);
  }

  getById(id: number): Observable<SingleResponseModel<EmployeeLanguage>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<EmployeeLanguage>>(newPath);
  }

  add(employeeLanguage: EmployeeLanguage): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, employeeLanguage);
  }

  delete(employeeLanguage: EmployeeLanguage): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath, employeeLanguage);
  }

  update(employeeLanguage: EmployeeLanguage): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, employeeLanguage);
  }

  getLanguages(): Observable<ListResponseModel<Language>> {
    let newPath = this.apiUrl + 'getlanguages';
    return this.httpClient.get<ListResponseModel<Language>>(newPath);
  }

  getLanguage(id: number): Observable<SingleResponseModel<Language>> {
    let newPath = this.apiUrl + 'getlanguage?id=' + id;
    return this.httpClient.get<SingleResponseModel<Language>>(newPath);
  }

  addLanguage(language: Language): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'addlanguage';
    return this.httpClient.post<ResponseModel>(newPath, language);
  }

  deleteLanguage(language: Language): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'deletelanguage';
    return this.httpClient.post<ResponseModel>(newPath, language);
  }

  updateLanguage(language: Language): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'updatelanguage';
    return this.httpClient.post<ResponseModel>(newPath, language);
  }
}
