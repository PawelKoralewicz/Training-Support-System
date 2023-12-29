import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPlannerComponent } from './training-planner.component';

describe('TrainingPlannerComponent', () => {
  let component: TrainingPlannerComponent;
  let fixture: ComponentFixture<TrainingPlannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingPlannerComponent]
    });
    fixture = TestBed.createComponent(TrainingPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
