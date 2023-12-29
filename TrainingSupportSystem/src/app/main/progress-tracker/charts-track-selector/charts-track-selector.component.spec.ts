import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsTrackSelectorComponent } from './charts-track-selector.component';

describe('ChartsTrackSelectorComponent', () => {
  let component: ChartsTrackSelectorComponent;
  let fixture: ComponentFixture<ChartsTrackSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartsTrackSelectorComponent]
    });
    fixture = TestBed.createComponent(ChartsTrackSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
