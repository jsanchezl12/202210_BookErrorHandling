import {HttpEvent,HttpHandler,HttpRequest,HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; //throw error
import { catchError } from 'rxjs/operators'; // catch error
import { ToastrService } from 'ngx-toastr'; //ToastrService
import { Injectable } from '@angular/core';

@Injectable()
export class HttpErrorInterceptorService extends HttpErrorResponse {
  //toast service in constructor
  constructor(private toastrService: ToastrService) { super(toastrService) }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((httpErrorResponse: HttpErrorResponse) => {
          console.log(httpErrorResponse.error.message);
          //nuevo codigo
          let errorMesagge = '';
          let errorType = '';

          if (httpErrorResponse.error instanceof ErrorEvent) {
            errorType = "Client side error"
            errorMesagge = httpErrorResponse.error.error;
          } else {
            errorType = "Server side error"
            if (httpErrorResponse.status === 0) {
              errorMesagge = "No hay conexión con el servidor";
            } else {
              errorMesagge = `${httpErrorResponse.status}: ${httpErrorResponse.error.error}`;
            }
            // Mensaje de error
            this.toastrService.error(errorMesagge, errorType, { closeButton: true });
          }
          return throwError(()=> new Error(errorMesagge));
        })
      )
  }
}
