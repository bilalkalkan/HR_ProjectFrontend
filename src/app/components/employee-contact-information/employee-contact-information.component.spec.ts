import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeContactInformationComponent } from './employee-contact-information.component';

describe('EmployeeContactInformationComponent', () => {
  let component: EmployeeContactInformationComponent;
  let fixture: ComponentFixture<EmployeeContactInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeContactInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeContactInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
