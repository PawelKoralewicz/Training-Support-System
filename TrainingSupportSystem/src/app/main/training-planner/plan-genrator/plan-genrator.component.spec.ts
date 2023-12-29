import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanGenratorComponent } from './plan-genrator.component';

describe('PlanGenratorComponent', () => {
  let component: PlanGenratorComponent;
  let fixture: ComponentFixture<PlanGenratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanGenratorComponent]
    });
    fixture = TestBed.createComponent(PlanGenratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
