import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../core/models/api-response.model';
import { FormGroup } from '@angular/forms';
import { HttpParamsBuilder } from '../../shared/utils/http-params-builder';

@Injectable({
  providedIn: 'root'
})
export class UsersControlService {

  private http = inject(HttpClient);
  private paramsBuilder = inject(HttpParamsBuilder);
  private url: string = environment.apiUrl + "/users";

  public getAllUsers(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(this.url + "/get/all");
  }

  public submitUser(body: FormGroup): Observable<IApiResponse> {
    if (body.value.id === null) {
      return this.http.post<IApiResponse>(this.url + "/register", body.value);
    } else {
      return this.http.put<IApiResponse>(this.url + "/update", body.value);
    }
  }

  public findById(id: number): Observable<IApiResponse> {
    const params = this.paramsBuilder.builder({ id });
    return this.http.get<IApiResponse>(this.url + "/get/byId", { params });
  }


  public deleteUser(id: number): Observable<IApiResponse> {
    const params = this.paramsBuilder.builder({ id });
    return this.http.delete<IApiResponse>(this.url + "/delete", { params });
  }

}