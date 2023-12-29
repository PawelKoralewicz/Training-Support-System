import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedDietComponent } from './generated-diet.component';

describe('GeneratedDietComponent', () => {
  let component: GeneratedDietComponent;
  let fixture: ComponentFixture<GeneratedDietComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneratedDietComponent]
    });
    fixture = TestBed.createComponent(GeneratedDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
