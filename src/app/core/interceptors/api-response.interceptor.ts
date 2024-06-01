import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { ApiResponse } from '../classes/api-response.class';

export const apiResponseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      return throwError(new ApiResponse(error.error.code, error.error.error, error.error.message, error.error.data));
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