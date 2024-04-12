import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import { useOutletContext } from 'react-router-dom';
import { Form } from '@formio/react';
import CustomCard from 'components/CustomCard';
import 'components/Formio';
import { useEffect, useState } from 'react';
import { generateSubmission } from 'utils/formio';
import { DataStore } from 'aws-amplify';
import { TestApplication, SubmissionStatus } from 'models';
import dayjs from 'dayjs';

const FORMIO_URL = process.env.REACT_APP_FORMIO_URL;

const HomeownershipHomePage = () => {
  const { application, habitat, openCycle } = useOutletContext();
  const [formAnswers, setFormAnswers] = useState([]);

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

  const handleOnSubmit = async (newSubmission) => {
    try {
      const original = await DataStore.query(TestApplication, application.id);

      const persistedApplication = await DataStore.save(
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

      console.log('persistedApplication', persistedApplication);
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
        />
      </ThemeProvider>
    </CustomCard>
  );
};

export default HomeownershipHomePage;
