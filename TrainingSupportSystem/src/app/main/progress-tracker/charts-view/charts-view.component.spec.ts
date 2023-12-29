import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsViewComponent } from './charts-view.component';

describe('ChartsViewComponent', () => {
  let component: ChartsViewComponent;
  let fixture: ComponentFixture<ChartsViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartsViewComponent]
    });
    fixture = TestBed.createComponent(ChartsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
