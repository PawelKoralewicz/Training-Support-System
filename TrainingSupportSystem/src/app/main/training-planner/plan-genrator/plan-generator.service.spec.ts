import { TestBed } from '@angular/core/testing';

import { PlanGeneratorService } from './plan-generator.service';

describe('PlanGeneratorService', () => {
  let service: PlanGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
