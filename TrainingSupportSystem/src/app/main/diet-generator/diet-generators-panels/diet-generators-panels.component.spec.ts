import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietGeneratorsPanelsComponent } from './diet-generators-panels.component';

describe('DietGeneratorsPanelsComponent', () => {
  let component: DietGeneratorsPanelsComponent;
  let fixture: ComponentFixture<DietGeneratorsPanelsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DietGeneratorsPanelsComponent]
    });
    fixture = TestBed.createComponent(DietGeneratorsPanelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
