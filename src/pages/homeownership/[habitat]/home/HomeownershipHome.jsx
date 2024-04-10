import {
  Authenticator,
  ThemeProvider,
  useBreakpointValue,
} from '@aws-amplify/ui-react';
import { useOutletContext } from 'react-router-dom';
import { SubmissionStatus } from 'models';
import CustomCard from 'components/CustomCard';
import { useState } from 'react';
import Home from './components/Home';
import SuccesfullySubmitted from './components/SuccesfullySubmitted';
import NoOpenCycle from './components/NoOpenCycle';

export default function HomeownershipHomePage() {
  const { application, habitat, openCycle } = useOutletContext();

  const [continueToApplication, setContinueToApplication] = useState(false);

  const handleOnReviewReturnedApplication = () => {
    setContinueToApplication(true);
  };

  const isReallySmall = useBreakpointValue({
    base: true,
    small: false,
  });

  const content = () => {
    if (
      application &&
      (openCycle || application.submissionStatus === SubmissionStatus.RETURNED)
    ) {
      return application.submissionStatus === SubmissionStatus.SUBMITTED ||
        (application.submissionStatus === SubmissionStatus.RETURNED &&
          !continueToApplication) ? (
        <SuccesfullySubmitted
          habitat={habitat}
          application={application}
          onReviewReturnedApplication={handleOnReviewReturnedApplication}
        />
      ) : (
        <Home habitat={habitat} />
      );
    }
    return <NoOpenCycle habitat={habitat} />;
  };

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
                form: {
                  padding: isReallySmall ? '0.25rem' : undefined,
                },
              },
            },
          },
        }}
      >
        <Authenticator>{content}</Authenticator>
      </ThemeProvider>
    </CustomCard>
  );
}
