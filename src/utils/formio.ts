import { FormAnswer } from 'models';
import { cloneDeep } from 'lodash';

interface ISubmission {
  data: {
    [key: string]: {
      [key: string]: unknown;
    };
  };
}

export const generateSubmission = (formAnswers: FormAnswer[]): ISubmission => {
  const submissionData: ISubmission['data'] = {};
  for (const formAnswer of formAnswers) {
    if (formAnswer.page && formAnswer.section) {
      submissionData[formAnswer.page] = {
        ...submissionData[formAnswer.page],
        [formAnswer.section]: cloneDeep(formAnswer.values),
      };
    }
  }
  return {
    data: submissionData,
  };
};
