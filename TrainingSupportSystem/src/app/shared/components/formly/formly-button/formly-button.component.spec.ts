import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlyButtonComponent } from './formly-button.component';

describe('FormlyButtonComponent', () => {
  let component: FormlyButtonComponent;
  let fixture: ComponentFixture<FormlyButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormlyButtonComponent]
    });
    fixture = TestBed.createComponent(FormlyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
