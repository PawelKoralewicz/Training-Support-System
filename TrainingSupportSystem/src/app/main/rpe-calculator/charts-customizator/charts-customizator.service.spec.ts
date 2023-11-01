import { TestBed } from '@angular/core/testing';

import { ChartsCustomizatorService } from './charts-customizator.service';

describe('ChartsCustomizatorService', () => {
  let service: ChartsCustomizatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsCustomizatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
