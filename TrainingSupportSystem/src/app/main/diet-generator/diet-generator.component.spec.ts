import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietGeneratorComponent } from './diet-generator.component';

describe('DietGeneratorComponent', () => {
  let component: DietGeneratorComponent;
  let fixture: ComponentFixture<DietGeneratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DietGeneratorComponent]
    });
    fixture = TestBed.createComponent(DietGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
