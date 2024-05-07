interface dataProps {
  current: number;
  general?: {
    firstName: string;
    lastName: string;
    dob: string;
    phone: string;
    sex: '' | 'MALE' | 'FEMALE' | 'OTHER';
    address: string;
  };
  household?: {
    members: number;
    income: string;
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
