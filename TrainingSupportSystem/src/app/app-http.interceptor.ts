import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { EMPTY, Observable, catchError, map, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { ToastService } from './shared/services/toast.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(
    private messageService: MessageService, 
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwtToken = this.authService.getToken();
    let newRequest = request;

    if(jwtToken) {
      newRequest = request.clone({
        setHeaders: { Authorization: `Bearer ${jwtToken}` }
      })
    }

    return next.handle(newRequest).pipe(
      map((event: HttpEvent<any>) => {
        if(event instanceof HttpResponse) {
          if(event.ok && newRequest.method !== 'GET') {
            this.toastService.toastSuccess('Operation completed successfully')
          }
        }
        return event;
      }),
      catchError((err: HttpErrorResponse) => {
        this.toastService.toastError(err.error.error.message)
        
        if(err.status === 401) {
          localStorage.removeItem('jwt');
          sessionStorage.removeItem('jwt');
          this.router.navigateByUrl('/auth/login');
        }
        return EMPTY;
      })
    );
  }
}
