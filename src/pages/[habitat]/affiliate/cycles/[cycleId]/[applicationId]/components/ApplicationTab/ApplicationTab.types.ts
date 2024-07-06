import { TestApplication } from 'models';

export interface ApplicationTabProps {
  application?: TestApplication;
  formAnswers: unknown[];
  formUrl: string;
}
