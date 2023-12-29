import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingPlannerPanelsComponent } from './training-planner-panels.component';

describe('TrainingPlannerPanelsComponent', () => {
  let component: TrainingPlannerPanelsComponent;
  let fixture: ComponentFixture<TrainingPlannerPanelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingPlannerPanelsComponent]
    });
    fixture = TestBed.createComponent(TrainingPlannerPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
