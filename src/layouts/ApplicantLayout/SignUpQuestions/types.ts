interface dataProps {
  current: number;
  general?: {
    firstName: string;
    lastName: string;
    dob: string;
    phone: string;
    sex: '' | 'Male' | 'Female' | 'Other';
    address: string;
  };
  household?: {
    members: number;
    income: number;
  };
  employment?: {
    unemployed: 'Yes' | 'No';
    position: string;
    employer: string;
  };
  habitat?: {
    source: string;
    firstTime: 'Yes' | 'No';
    interest: string;
  };
}

export default dataProps;
