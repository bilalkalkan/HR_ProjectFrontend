import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEmergencyInformationComponent } from './employee-emergency-information.component';

describe('EmployeeEmergencyInformationComponent', () => {
  let component: EmployeeEmergencyInformationComponent;
  let fixture: ComponentFixture<EmployeeEmergencyInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeEmergencyInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEmergencyInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
