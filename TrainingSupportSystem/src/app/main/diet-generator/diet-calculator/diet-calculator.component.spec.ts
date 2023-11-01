import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietCalculatorComponent } from './diet-calculator.component';

describe('DietCalculatorComponent', () => {
  let component: DietCalculatorComponent;
  let fixture: ComponentFixture<DietCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DietCalculatorComponent]
    });
    fixture = TestBed.createComponent(DietCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
