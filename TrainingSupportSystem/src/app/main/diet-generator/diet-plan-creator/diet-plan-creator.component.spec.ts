import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietPlanCreatorComponent } from './diet-plan-creator.component';

describe('DietPlanCreatorComponent', () => {
  let component: DietPlanCreatorComponent;
  let fixture: ComponentFixture<DietPlanCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DietPlanCreatorComponent]
    });
    fixture = TestBed.createComponent(DietPlanCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
