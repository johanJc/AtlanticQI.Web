import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { GeneralService } from '../services/general.service';

export const interceptor: HttpInterceptorFn = (req, next) => {
  const sharedService = inject(GeneralService);
  sharedService.setLoading = true;  

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {      
      return throwError(() => error);
    }),
    finalize(() => {
      setTimeout(() => sharedService.setLoading = false, 500);    
    })
  );
};
