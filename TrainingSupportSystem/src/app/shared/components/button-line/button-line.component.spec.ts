import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonLineComponent } from './button-line.component';

describe('ButtonLineComponent', () => {
  let component: ButtonLineComponent;
  let fixture: ComponentFixture<ButtonLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonLineComponent]
    });
    fixture = TestBed.createComponent(ButtonLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
