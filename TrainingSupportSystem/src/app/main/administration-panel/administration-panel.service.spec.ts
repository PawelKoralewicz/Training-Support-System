import { TestBed } from '@angular/core/testing';

import { AdministrationPanelService } from './administration-panel.service';

describe('AdministrationPanelService', () => {
  let service: AdministrationPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministrationPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
