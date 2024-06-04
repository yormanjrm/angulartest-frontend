import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../core/models/api-response.model';
import { FormGroup } from '@angular/forms';
import { HttpParamsBuilder } from '../../shared/utils/http-params-builder';
import { FormDataBuilder } from '../../shared/utils/form-data-builder';

@Injectable({
  providedIn: 'root'
})
export class UsersControlService {

  private http = inject(HttpClient);
  private paramsBuilder = inject(HttpParamsBuilder);
  private formDataBuilder = inject(FormDataBuilder);
  private url: string = environment.apiUrl + "/users";

  public getAllUsers(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(this.url + "/get/all");
  }

  public submitUser(body: FormGroup, imageFile: any): Observable<IApiResponse> {
    const formdata = this.formDataBuilder.builder({
      id: body.value.id,
      name: body.value.name,
      email: body.value.email,
      password: body.value.password,
      role: body.value.role,
      image: body.value.image,
      imageFile: imageFile
    });
    if (body.value.id === 0) {
      return this.http.post<IApiResponse>(this.url + "/register", formdata);
    } else {
      return this.http.put<IApiResponse>(this.url + "/update", formdata);
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