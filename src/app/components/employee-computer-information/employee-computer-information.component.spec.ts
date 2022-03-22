import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeComputerInformationComponent } from './employee-computer-information.component';

describe('EmployeeComputerInformationComponent', () => {
  let component: EmployeeComputerInformationComponent;
  let fixture: ComponentFixture<EmployeeComputerInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeComputerInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComputerInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
