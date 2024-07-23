import { DataStore } from 'aws-amplify/datastore';
import { throttle } from 'lodash';

import { FormAnswer, TestApplication } from 'models';

import uploadSubmissionProps from './uploadSubmission.types';

const uploadSubmission = async ({
  submission,
  application,
  nextPage,
}: uploadSubmissionProps) => {
  try {
    if (application) {
      const submissionEntries = Object.entries(submission.data);

      const [page, values] =
        submissionEntries[
          nextPage ? nextPage - 1 : submissionEntries.length - 1
        ];

      const currentApplication = await DataStore.query(TestApplication, (c1) =>
        c1.id.eq(application.id)
      );

      if (currentApplication) {
        await DataStore.save(
          TestApplication.copyOf(currentApplication[0], (original) => {
            original.lastPage = Number(nextPage);
          })
        );
      }

      const persistedFormAnswer = await DataStore.query(FormAnswer, (c1) =>
        c1.and((c2) => {
          const criteriaArray = [
            c2.testapplicationID.eq(application.id),
            c2.page.eq(page),
          ];

          return criteriaArray;
        })
      );

      if (persistedFormAnswer.length > 0) {
        await DataStore.save(
          FormAnswer.copyOf(persistedFormAnswer[0], (original) => {
            original.values = JSON.stringify(values);
          })
        );
      } else {
        await DataStore.save(
          new FormAnswer({
            testapplicationID: application.id,
            page,
            values: JSON.stringify(values),
          })
        );
      }
    }
  } catch (error) {
    console.log('Error persisting submission', error);
  }
};

export default throttle(uploadSubmission, 50, {
  leading: true,
  trailing: false,
});
