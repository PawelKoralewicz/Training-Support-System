import { TestBed } from '@angular/core/testing';

import { TrainingPlannerService } from './training-planner.service';

describe('TrainingPlannerService', () => {
  let service: TrainingPlannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainingPlannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
