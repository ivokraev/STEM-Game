import { ComponentFixture, TestBed, TestBedStatic } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthComponent } from '../../auth/auth.component';
import { DisableButtonStyleDirective } from './disable-button.directive';

describe('DisableButtonDirective', () => {
  let component: AuthComponent;

  let fixture: ComponentFixture<AuthComponent>;
  let buttons: any[];


  const initialTestState = {
    currentUser: null,
    authError: null
  };

  beforeEach(() => {

    fixture = TestBed.configureTestingModule({
      declarations: [
        AuthComponent,
        DisableButtonStyleDirective,
      ],
      providers: [
        {provide: FormBuilder},
        provideMockStore({ initialState: initialTestState }),
      ]
    })
    .createComponent(AuthComponent);

    fixture.detectChanges();
    component = fixture.componentInstance;


    buttons = fixture.debugElement.queryAll(By.directive(DisableButtonStyleDirective));
  });

  it('should change style of a disabled button', () => {
    buttons.forEach((element, index) => {
      const button: HTMLElement = buttons[index].nativeElement;
      if(button.hasAttribute('disabled')) {
        expect(button.style.cursor).toBe('not-allowed');
        expect(button.style.backgroundColor).toBe('rgb(143, 171, 255)');
      }
      else{
        expect(button.style.cursor).toBe('pointer');
        expect(button.style.backgroundColor).toBe('#1E40AF');
      }
    });
  })
});
