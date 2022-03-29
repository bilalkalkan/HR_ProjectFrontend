import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAwardInformationComponent } from './employee-award-information.component';

describe('EmployeeAwardInformationComponent', () => {
  let component: EmployeeAwardInformationComponent;
  let fixture: ComponentFixture<EmployeeAwardInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeAwardInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAwardInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
