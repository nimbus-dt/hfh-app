import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import { useOutletContext } from 'react-router-dom';
import { Form } from '@formio/react';
import CustomCard from 'components/CustomCard';
import 'components/Formio';
import { useEffect, useState } from 'react';
import { generateSubmission } from 'utils/formio';

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
          onSubmit={console.log}
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
