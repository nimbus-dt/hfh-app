import { useEffect } from 'react';
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import { useOutletContext } from 'react-router-dom';
import { Form } from '@formio/react';
import CustomCard from 'components/CustomCard';
import 'utils/customComponents';

const FORMIO_URL = process.env.REACT_APP_FORMIO_URL;

const HomeownershipHomePage = () => {
  const { application, habitat, openCycle } = useOutletContext();

  useEffect(() => {
    console.log(application, habitat, openCycle);
  }, [application, habitat, openCycle]);

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
          <Authenticator>
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
            />
          </Authenticator>
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
          onChange={(submission) => {
            console.log(submission);
          }}
          onSubmit={console.log}
          options={{
            additional: {
              application,
              habitat,
              openCycle,
            },
          }}
        />
      </ThemeProvider>
    </CustomCard>
  );
};

export default HomeownershipHomePage;
