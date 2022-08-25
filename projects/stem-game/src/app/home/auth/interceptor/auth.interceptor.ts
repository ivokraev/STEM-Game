import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectAuthToken } from '../store/selectors/auth.selectors'


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.select(selectAuthToken).pipe(
      switchMap((authToken: string | null) => {
        if(!authToken) return next.handle(request);

        const modifiedReq = request.clone({
          params: new HttpParams().set('auth', authToken),
        })
        return next.handle(modifiedReq);
      })
    )
  }
}
