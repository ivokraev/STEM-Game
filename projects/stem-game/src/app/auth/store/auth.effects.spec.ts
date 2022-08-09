import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';


import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        { provide: AuthService},
        { provide: Router, useValue: routerSpy},
        provideMockActions(() => actions$)
      ],
      imports: [
        HttpClientModule
      ]
    });

    effects = TestBed.inject(AuthEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
