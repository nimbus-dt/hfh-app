import { FormAnswer } from 'models';
import { cloneDeep } from 'lodash';

interface ISubmission {
  data: {
    [key: string]: unknown;
  };
}

export const generateSubmission = (formAnswers: FormAnswer[]): ISubmission => {
  const submissionData: ISubmission['data'] = {};

  for (const formAnswer of formAnswers) {
    if (formAnswer.page && formAnswer.values) {
      submissionData[formAnswer.page] = cloneDeep(formAnswer.values);
    }
  }

  const submission = {
    data: submissionData,
  };

  return submission;
};
