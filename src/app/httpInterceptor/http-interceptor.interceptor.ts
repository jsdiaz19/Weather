import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environment/environment';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {


  constructor(private translate: TranslateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.addParams(next, request);
  }

  /**
   * Agrega parametro de token y idioma
   * @param next
   * @param request
   * @returns
   */
  addParams(next:HttpHandler,request: HttpRequest<unknown> ){
    const newParams = request.params.set('key', environment.API_KEY).set('lang', this.translate.currentLang);
    const newRequest= request.clone({ params: newParams});
    return next.handle(newRequest).pipe(catchError((error:HttpErrorResponse)=> {
      let errorMessage = 'Ocurrió un error desconocido';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 400:
            errorMessage = 'Solicitud incorrecta (400)';
            break;
          case 401:
            errorMessage = 'No autorizado (401)';
            break;
          case 403:
            errorMessage = 'Prohibido (403)';
            break;
          case 404:
            errorMessage = 'No encontrado (404)';
            break;
          case 500:
            errorMessage = 'Error del servidor (500)';
            break;
        }
      }
      console.error('HTTP Error:', errorMessage);
      return throwError(() => new Error(errorMessage));
    }));
  }



}
