import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseDataUpdateComponent } from './exercise-data-update.component';

describe('ExerciseDataUpdateComponent', () => {
  let component: ExerciseDataUpdateComponent;
  let fixture: ComponentFixture<ExerciseDataUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseDataUpdateComponent]
    });
    fixture = TestBed.createComponent(ExerciseDataUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
