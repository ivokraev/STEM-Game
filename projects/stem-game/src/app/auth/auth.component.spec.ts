import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let store: MockStore;

  const initialTestState = {
    currentUser: null,
    authError: null
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthComponent ],
      providers: [
        {provide: FormBuilder},
        provideMockStore({ initialState: initialTestState }),
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
