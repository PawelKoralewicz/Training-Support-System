import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSaverFormComponent } from './plan-saver-form.component';

describe('PlanSaverFormComponent', () => {
  let component: PlanSaverFormComponent;
  let fixture: ComponentFixture<PlanSaverFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanSaverFormComponent]
    });
    fixture = TestBed.createComponent(PlanSaverFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
