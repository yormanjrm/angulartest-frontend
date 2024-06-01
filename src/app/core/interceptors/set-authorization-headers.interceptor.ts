import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { StorageService } from '../services/storage.service';
import { IToken } from '../../api/authentication/models/token-model';

export const setAuthorizationHeadersInterceptor: HttpInterceptorFn = (req, next) => {

  const storageService = inject(StorageService);
  const token: IToken = storageService.getSessionItem("token");

  const isTokenStored = token;
  const isApiUrl = req.url.startsWith(environment.apiUrl);

  if (isTokenStored && isApiUrl) {
    req = req.clone({
      headers: req.headers.set('Authorization', isTokenStored.token)
    });
  }

  return next(req);

};