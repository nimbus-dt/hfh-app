import { Authenticator } from '@aws-amplify/ui-react';
import { useOutletContext } from 'react-router-dom';
import {
  Habitat,
  SubmissionStatus,
  TestApplication,
  TestCycle,
  ReviewStatus,
} from 'models';
import CustomCard from 'components/CustomCard';
import { useState } from 'react';
import Home from './components/Home';
import SuccesfullySubmitted from './components/SuccesfullySubmitted';
import NoOpenCycle from './components/NoOpenCycle';
import DecisionsCard from './components/DecisionsCard';

interface IOutletContext {
  application?: TestApplication;
  habitat?: Habitat;
  openCycle?: TestCycle;
}

const ApplicantCyclePage = () => {
  const { application, habitat, openCycle }: IOutletContext =
    useOutletContext();

  const [continueToApplication, setContinueToApplication] = useState(false);

  const handleOnReviewReturnedApplication = () => {
    setContinueToApplication(true);
  };

  const content = () => {
    if (
      application &&
      (openCycle || application.reviewStatus === ReviewStatus.RETURNED)
    ) {
      return application.submissionStatus === SubmissionStatus.COMPLETED ||
        (application.reviewStatus === ReviewStatus.RETURNED &&
          !continueToApplication) ? (
        <SuccesfullySubmitted
          habitat={habitat}
          application={application}
          onReviewReturnedApplication={handleOnReviewReturnedApplication}
        />
      ) : (
        <Home
          habitat={habitat}
          application={application}
          openCycle={openCycle}
        />
      );
    }
    return <NoOpenCycle habitat={habitat} />;
  };

  return (
    <>
      <CustomCard>
        <Authenticator>{content}</Authenticator>
      </CustomCard>
      {application &&
        application.submissionStatus !== SubmissionStatus.INCOMPLETE &&
        !continueToApplication && <DecisionsCard application={application} />}
    </>
  );
};

export default ApplicantCyclePage;
