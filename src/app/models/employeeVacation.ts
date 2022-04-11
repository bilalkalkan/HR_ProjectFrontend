export class EmployeeVacation {
  id!: number;
  employeeId!: number;
  employeeFirstName!: string;
  employeeLastName!: string;
  allowanceType!: string;
  allowanceStartingDate!: Date;
  allowanceExpirationDate!: Date;
  allowanceNumberOfDays!: number;
  addressToBeAllowed!: string;
  statement!: string;
}
