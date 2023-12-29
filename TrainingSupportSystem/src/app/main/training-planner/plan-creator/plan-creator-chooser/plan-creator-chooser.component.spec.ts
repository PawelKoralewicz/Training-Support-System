import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCreatorChooserComponent } from './plan-creator-chooser.component';

describe('PlanCreatorChooserComponent', () => {
  let component: PlanCreatorChooserComponent;
  let fixture: ComponentFixture<PlanCreatorChooserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanCreatorChooserComponent]
    });
    fixture = TestBed.createComponent(PlanCreatorChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
