import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDebitComponent } from './employee-debit.component';

describe('EmployeeDebitComponent', () => {
  let component: EmployeeDebitComponent;
  let fixture: ComponentFixture<EmployeeDebitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDebitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
