import React, { useEffect, useMemo, useState } from 'react';
import { Form } from '@formio/react';
import { useNavigate } from 'react-router-dom';
import { FormAnswer, Habitat, TestApplication, TestCycle } from 'models';
import { debounce } from 'lodash';
import { DataStore } from 'aws-amplify';
import { generateSubmission } from 'utils/formio';
import { Options } from '@formio/react/lib/components/Form';
import { useFormById } from 'hooks/services';

interface IProperties {
  habitat?: Habitat;
  application?: TestApplication;
  openCycle?: TestCycle;
}

const FORMIO_URL = process.env.REACT_APP_FORMIO_URL;

const Home = ({ habitat, application, openCycle }: IProperties) => {
  const [formAnswers, setFormAnswers] = useState<FormAnswer[]>([]);

  const navigate = useNavigate();

  const { data: form } = useFormById({
    id: openCycle?.form || '',
    dependencyArray: [openCycle],
  });

  const persistSubmission = useMemo(
    () =>
      debounce(async (submission, nextPage?: number) => {
        try {
          if (application) {
            const submissionEntries = Object.entries(submission.data);
            const [page, values] =
              submissionEntries[
                nextPage ? nextPage - 1 : submissionEntries.length - 1
              ];

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
        navigate('../review');
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
    form && (
      <Form
        src={`${FORMIO_URL}/${form.url}`}
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
        onNextPage={({
          submission,
          page,
        }: {
          submission: unknown;
          page: number;
        }) => {
          persistSubmission(submission, page);
        }}
      />
    )
  );
};

export default Home;
