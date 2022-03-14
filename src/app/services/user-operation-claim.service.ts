import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserOperationClaim } from '../models/userOperationClaim';
import { UserOperationClaimDetail } from '../models/userOperationClaimDto';

@Injectable({
  providedIn: 'root',
})
export class UserOperationClaimService {
  apiUrl = 'https://localhost:44367/api/UserOperationClaims/';

  constructor(private httpClient: HttpClient) {}
  getAll(): Observable<ListResponseModel<UserOperationClaim>> {
    let newPath = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<UserOperationClaim>>(newPath);
  }

  get(id: number): Observable<SingleResponseModel<UserOperationClaim>> {
    let newPath = this.apiUrl + 'getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<UserOperationClaim>>(
      newPath
    );
  }
  getUserOperationDetailList(): Observable<
    ListResponseModel<UserOperationClaimDetail>
  > {
    let newPath = this.apiUrl + 'getuseroperationclaimdetails';
    return this.httpClient.get<ListResponseModel<UserOperationClaimDetail>>(
      newPath
    );
  }
  add(userOperationClaim: UserOperationClaim): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'add';
    return this.httpClient.post<ResponseModel>(newPath, userOperationClaim);
  }

  delete(userOperationClaim: UserOperationClaim): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'delete';
    return this.httpClient.post<ResponseModel>(newPath, userOperationClaim);
  }

  update(userOperationClaim: UserOperationClaim): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, userOperationClaim);
  }
}
