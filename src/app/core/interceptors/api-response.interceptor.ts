import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { ApiResponse } from '../classes/api-response.class';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SweetalertService } from '../../shared/services/sweetalert.service';
import { StorageService } from '../services/storage.service';

export const apiResponseInterceptor: HttpInterceptorFn = (req, next) => {

  const storageService = inject(StorageService);
  const sweetAlertService = inject(SweetalertService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        sweetAlertService.toastAlert('Session expired, please log in again', 'info', "bottom");
        storageService.removeSessionItem('token');
        router.navigate(['authentication']);
        return throwError(() => error);
      } else {
        return throwError(new ApiResponse(error.error.code, error.error.error, error.error.message, error.error.data));
      }
    }),
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        return event.clone({
          body: new ApiResponse(event.body.code, event.body.error, event.body.message, event.body.data)
        });
      }
      return event;
    })
  );
};