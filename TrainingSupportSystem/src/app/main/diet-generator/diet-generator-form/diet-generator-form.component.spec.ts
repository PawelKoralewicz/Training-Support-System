import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietGeneratorFormComponent } from './diet-generator-form.component';

describe('DietGeneratorFormComponent', () => {
  let component: DietGeneratorFormComponent;
  let fixture: ComponentFixture<DietGeneratorFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DietGeneratorFormComponent]
    });
    fixture = TestBed.createComponent(DietGeneratorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
