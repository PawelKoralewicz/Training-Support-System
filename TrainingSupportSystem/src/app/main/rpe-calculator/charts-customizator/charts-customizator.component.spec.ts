import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsCustomizatorComponent } from './charts-customizator.component';

describe('ChartsCustomizatorComponent', () => {
  let component: ChartsCustomizatorComponent;
  let fixture: ComponentFixture<ChartsCustomizatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartsCustomizatorComponent]
    });
    fixture = TestBed.createComponent(ChartsCustomizatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
