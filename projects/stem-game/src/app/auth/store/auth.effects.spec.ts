import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        { provide: AuthService},
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
