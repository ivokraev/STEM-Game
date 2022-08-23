import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, switchMap, first } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectIsAuthToken } from '../../home/auth/store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root',
})
export class GameGuard implements CanLoad {
  constructor(private store: Store, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      return this.store.select(selectIsAuthToken).pipe(
        first(),
        switchMap((isAuthToken: boolean) => {
          if(isAuthToken){
            return of(true);
          }
          return of(this.router.createUrlTree(['/login']));
        })
      );
  }
}
