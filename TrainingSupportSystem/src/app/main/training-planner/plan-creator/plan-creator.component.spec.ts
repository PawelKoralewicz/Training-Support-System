import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCreatorComponent } from './plan-creator.component';

describe('PlanCreatorComponent', () => {
  let component: PlanCreatorComponent;
  let fixture: ComponentFixture<PlanCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanCreatorComponent]
    });
    fixture = TestBed.createComponent(PlanCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
