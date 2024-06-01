import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IToken } from '../models/token-model';
import { HttpParamsBuilder } from '../../../core/utils/http-params-builder';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private http = inject(HttpClient);
  private paramsBuilder = inject(HttpParamsBuilder);
  private url: string = environment.apiUrl + "/login";

  public login(email: string, password: string): Observable<IToken> {    
    const params = this.paramsBuilder.builder({ email, password });
    return this.http.post<IToken>(this.url, { params });
  }

}