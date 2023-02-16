import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { SnackBarService } from '../shared/services/snack-bar.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private snackbar: SnackBarService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if ([401, 403].includes(err.status)) {
          // console.log('eror = ', err.statusText);
          // auto logout if 401 or 403 response returned from api
          // this.accountService.logout();
        }

        const error = err.error?.message || err.statusText;
        // console.error(err);
        this.snackbar.warn(error);
        return throwError(() => error);
      })
    );
  }
}
