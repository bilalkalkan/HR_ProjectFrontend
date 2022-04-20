export class EmployeeVacation {
  id!: number;
  employeeId!: number;
  employeeFirstName!: string;
  employeeLastName!: string;
  allowanceTypeId!: number;
  allowanceTypeName!: string;
  allowanceStartingDate!: Date;
  allowanceExpirationDate!: Date;
  allowanceNumberOfDays!: number;
  addressToBeAllowed!: string;
  statement!: string;
}
