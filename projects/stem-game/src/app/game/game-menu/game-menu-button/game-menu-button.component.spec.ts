import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMenuButtonComponent } from './game-menu-button.component';

describe('GameMenuButtonComponent', () => {
  let component: GameMenuButtonComponent;
  let fixture: ComponentFixture<GameMenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameMenuButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
