import React, { useEffect, useMemo, useState } from 'react';
import { Form } from '@formio/react';
import { useNavigate } from 'react-router-dom';
import {
  FormAnswer,
  Habitat,
  TestApplication,
  TestCycle,
  SubmissionStatus,
} from 'models';
import { debounce } from 'lodash';
import { DataStore } from 'aws-amplify';
import dayjs from 'dayjs';
import { generateSubmission } from 'utils/formio';
import { Options } from '@formio/react/lib/components/Form';

interface IProperties {
  habitat: Habitat;
  application?: TestApplication;
  openCycle?: TestCycle;
}

const FORMIO_URL = process.env.REACT_APP_FORMIO_URL;

const Home = ({ habitat, application, openCycle }: IProperties) => {
  const [formAnswers, setFormAnswers] = useState<FormAnswer[]>([]);

  const persistSubmission = useMemo(
    () =>
      debounce(async (submission) => {
        try {
          for (const [page, values] of Object.entries(submission.data)) {
            if (application) {
              const persistedFormAnswer = await DataStore.query(
                FormAnswer,
                (c1) =>
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
            console.log('submission persisted');
          }
        } catch (error) {
          console.log('Error persisting submission', error);
        }
      }, 50),
    [application]
  );

  const handleOnSubmit = async (submission: unknown) => {
    try {
      if (application && openCycle) {
        await persistSubmission(submission);

        const original = await DataStore.query(TestApplication, application.id);

        if (original) {
          await DataStore.save(
            TestApplication.copyOf(original, (originalApplication) => {
              if (
                originalApplication.submissionStatus !==
                SubmissionStatus.RETURNED
              ) {
                originalApplication.testcycleID = openCycle.id;
              }
              originalApplication.submissionStatus = SubmissionStatus.SUBMITTED;
              originalApplication.submittedDate = dayjs().format('YYYY-MM-DD');
            })
          );

          console.log('testApplication updated');
        }
      }
    } catch (error) {
      console.log('Error updating application');
    }
  };

  useEffect(() => {
    const getFormAnswers = async () => {
      if (application) {
        const persistedFormAnswers = await application.FormAnswers.toArray();
        setFormAnswers(persistedFormAnswers);
      }
    };
    getFormAnswers();
  }, [application]);

  return (
    <Form
      src={`${FORMIO_URL}/loudoun`}
      onSubmit={handleOnSubmit}
      options={
        {
          additional: {
            application,
            habitat,
            openCycle,
          },
        } as Options
      }
      submission={generateSubmission(formAnswers)}
      onNextPage={({ submission }: { submission: unknown }) => {
        persistSubmission(submission);
      }}
    />
  );
};

export default Home;
