import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealCreatorComponent } from './meal-creator.component';

describe('MealCreatorComponent', () => {
  let component: MealCreatorComponent;
  let fixture: ComponentFixture<MealCreatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MealCreatorComponent]
    });
    fixture = TestBed.createComponent(MealCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
