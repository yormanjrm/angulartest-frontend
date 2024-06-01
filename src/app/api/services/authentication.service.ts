import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../core/models/api-response.model';
import { environment } from '../../../environments/environment';
import { FormDataBuilder } from '../../shared/utils/form-data-builder';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private http = inject(HttpClient);
  private formDataBuilder = inject(FormDataBuilder);
  private url: string = environment.apiUrl + "/login";

  public login(email: string, password: string): Observable<IApiResponse> {
    const formdata = this.formDataBuilder.builder({ email, password });
    return this.http.post<IApiResponse>(this.url, formdata);
  }

}