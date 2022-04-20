export class Employee {
  id!: number;
  firstName!: string;
  lastName!: string;
  identificationNumber: string = '';
  gender: string = '';
  nationalityId!: number;
  nationalityName: string = '';
  placeOfBirth!: string;
  dateOfBirth!: Date;
  maritalStatus!: string;
  registrationNumber!: string;
  companyEntryDate!: Date;
  sgkEntryDate!: Date;
  annualLeaveEntitlementStartDate!: Date;
  annualLeaveGroup!: string;
  severancePayStartDate!: Date;
  oyakStartDateOfWork!: Date;
  firstDateOfJoiningTheGroup!: Date;
  wage!: number;
  typeOfWage!: string;
  typeOfPayment!: string;
  paymentCurrency!: string;
}
