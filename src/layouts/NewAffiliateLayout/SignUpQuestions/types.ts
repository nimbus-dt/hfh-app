import { Habitat } from 'models';

interface dataProps {
  current: number;
  general?: {
    firstName: string;
    lastName: string;
    dob: string;
    phone: string;
    sex: '' | 'MALE' | 'FEMALE' | 'OTHER';
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
  user: {
    username: string;
  };
}

export default dataProps;
