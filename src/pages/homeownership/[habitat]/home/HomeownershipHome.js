import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import { useOutletContext } from 'react-router-dom';
import { Form } from '@formio/react';
import CustomCard from 'components/CustomCard';
import 'components/Formio';
import { useEffect, useMemo, useState } from 'react';
import { generateSubmission } from 'utils/formio';
import { DataStore } from 'aws-amplify';
import { TestApplication, SubmissionStatus, FormAnswer } from 'models';
import dayjs from 'dayjs';
import { debounce } from 'lodash';

const FORMIO_URL = process.env.REACT_APP_FORMIO_URL;

const HomeownershipHomePage = () => {
  const { application, habitat, openCycle } = useOutletContext();
  const [formAnswers, setFormAnswers] = useState([]);

  const persistSubmission = useMemo(
    () =>
      debounce(async (submission) => {
        try {
          for (const [page, values] of Object.entries(submission.data)) {
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

  useEffect(() => {
    const getFormAnswers = async () => {
      if (application) {
        const persistedFormAnswers = await application.FormAnswers.toArray();
        setFormAnswers(persistedFormAnswers);
      }
    };
    getFormAnswers();
  }, [application]);

  if (!habitat || !openCycle) {
    return <p>loading...</p>;
  }

  const handleOnSubmit = async (submission) => {
    try {
      await persistSubmission(submission);

      const original = await DataStore.query(TestApplication, application.id);

      await DataStore.save(
        TestApplication.copyOf(original, (originalApplication) => {
          if (
            originalApplication.submissionStatus !== SubmissionStatus.RETURNED
          ) {
            originalApplication.testcycleID = openCycle.id;
          }
          originalApplication.submissionStatus = SubmissionStatus.SUBMITTED;
          originalApplication.submittedDate = dayjs().format('YYYY-MM-DD');
        })
      );

      console.log('testApplication updated');
    } catch (error) {
      console.log('Error updating application');
    }
  };

  if (!application) {
    return (
      <CustomCard>
        <ThemeProvider
          theme={{
            name: 'homeownership-authentication',
            tokens: {
              components: {
                authenticator: {
                  container: {
                    widthMax: '100%',
                  },
                  router: {
                    borderStyle: 'none',
                    boxShadow: 'none',
                  },
                },
              },
            },
          }}
        >
          <Authenticator />
        </ThemeProvider>
      </CustomCard>
    );
  }

  return (
    <CustomCard>
      <ThemeProvider
        theme={{
          name: 'homeownership-authentication',
          tokens: {
            components: {
              authenticator: {
                container: {
                  widthMax: '100%',
                },
                router: {
                  borderStyle: 'none',
                  boxShadow: 'none',
                },
              },
            },
          },
        }}
      >
        <Form
          src={`${FORMIO_URL}/loudoun`}
          onSubmit={handleOnSubmit}
          options={{
            additional: {
              application,
              habitat,
              openCycle,
            },
          }}
          submission={generateSubmission(formAnswers)}
          onNextPage={({ submission }) => {
            persistSubmission(submission);
          }}
        />
      </ThemeProvider>
    </CustomCard>
  );
};

export default HomeownershipHomePage;
