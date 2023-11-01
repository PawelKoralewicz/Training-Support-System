import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpeCalculatorComponent } from './rpe-calculator.component';

describe('RpeCalculatorComponent', () => {
  let component: RpeCalculatorComponent;
  let fixture: ComponentFixture<RpeCalculatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RpeCalculatorComponent]
    });
    fixture = TestBed.createComponent(RpeCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
