import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IApiResponse } from '../../core/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class UsersControlService {

  private http = inject(HttpClient);
  private url: string = environment.apiUrl + "/users";

  public getAllUsers(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(this.url + "/get/all");
  }
}