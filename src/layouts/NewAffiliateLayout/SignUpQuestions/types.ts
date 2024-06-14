import { type Habitat, type User } from 'models';

interface dataProps {
  current: number;
  general?: {
    firstName: string;
    lastName: string;
    dob: string;
    phone: string;
    sex: 'MALE' | 'FEMALE' | 'OTHER';
  };
  affiliate?: {
    position: string;
    description: string;
    joinMonth: string;
    joinYear: string;
  };
}

export interface SignUpQuestionsProps {
  habitat: Habitat;
  isUserAllowed: boolean;
  user: {
    username: string;
  };
}

export default dataProps;
