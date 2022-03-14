import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { ListResponseModel } from '../models/listResponseModel';
import { OperationClaim } from '../models/operationClaim';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class OperationClaimService {
  apiUrl = 'https://localhost:44367/api/OperationClaims/';
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<ListResponseModel<OperationClaim>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<OperationClaim>>(newPath);
  }

  get(id: number): Observable<SingleResponseModel<OperationClaim>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<OperationClaim>>(newPath);
  }

  add(operationClaim: OperationClaim): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, operationClaim);
  }

  delete(operationClaim: OperationClaim): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath, operationClaim);
  }

  update(operationClaim: OperationClaim): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, operationClaim);
  }
}
