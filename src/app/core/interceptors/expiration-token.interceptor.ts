import type { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SweetalertService } from '../services/sweetalert.service';

export const expirationTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const sweetAlertService = inject(SweetalertService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        sweetAlertService.toastAlert('Session expired, please log in again', 'info', "bottom");
        storageService.removeSessionItem('token');
        router.navigate(['authentication']);
      }
      return throwError(() => error);
    })
  )
};