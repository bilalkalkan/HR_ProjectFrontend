import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePastWorkExperienceComponent } from './employee-past-work-experience.component';

describe('EmployeePastWorkExperienceComponent', () => {
  let component: EmployeePastWorkExperienceComponent;
  let fixture: ComponentFixture<EmployeePastWorkExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePastWorkExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePastWorkExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
