import React, { useCallback, useState } from 'react';
import { Form } from '@formio/react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  Habitat,
  TestApplication,
  TestCycle,
  SubmissionStatus,
  ReviewStatus,
} from 'models';
import { DataStore } from 'aws-amplify';
import dayjs from 'dayjs';
import { generateSubmission } from 'utils/formio';
import { Options } from '@formio/react/lib/components/Form';
import { Button, Flex, Text } from '@aws-amplify/ui-react';
import CustomCard from 'components/CustomCard';
import Modal from 'components/Modal';
import useAsync from 'hooks/utils/useAsync/useAsync';
import { Status } from 'utils/enums';
import Loading from 'components/Loading';
import Error from 'components/Error';

interface IProperties {
  habitat: Habitat;
  application?: TestApplication;
  openCycle?: TestCycle;
  setApplication: (application: TestApplication) => void;
}

const FORMIO_URL = process.env.REACT_APP_FORMIO_URL;

const HomeownershipReviewPage = () => {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [loadingForm, setLoadingForm] = useState(true);
  const { application, habitat, openCycle, setApplication } =
    useOutletContext<IProperties>();

  const navigate = useNavigate();

  const handleOnClickGoBack = () => {
    navigate('../home');
  };

  const handleOnSubmit = async () => {
    try {
      if (application && openCycle) {
        const original = await DataStore.query(TestApplication, application.id);

        if (original) {
          const updatedApplication = await DataStore.save(
            TestApplication.copyOf(original, (originalApplication) => {
              if (originalApplication.reviewStatus !== ReviewStatus.RETURNED) {
                originalApplication.testcycleID = openCycle.id;
              }
              originalApplication.submissionStatus = SubmissionStatus.COMPLETED;
              originalApplication.submittedDate = dayjs().format('YYYY-MM-DD');
            })
          );

          setApplication(updatedApplication);

          navigate('../home');
        }
      }
    } catch (error) {
      console.log('Error updating application');
    }
  };

  const asyncFunction = useCallback(async () => {
    if (application) {
      return application.FormAnswers.toArray();
    }
  }, [application]);

  const { status, value } = useAsync({
    asyncFunction,
  });

  const handleOnClickSubmit = () => {
    setShowSubmitModal(true);
  };

  const handleOnClickSubmitModalClose = () => {
    setShowSubmitModal(false);
  };

  if (status === Status.REJECTED) {
    return <Error />;
  }

  if (status === Status.PENDING || !value || !habitat || !openCycle) {
    return <Loading />;
  }

  return (
    <CustomCard>
      {loadingForm && <Loading />}
      <Form
        src={`${FORMIO_URL}/${openCycle.formUrl}`}
        onRender={() => {
          setLoadingForm(false);
        }}
        options={
          {
            readOnly: true,
            renderMode: 'flat',
            additional: {
              application,
              habitat,
              openCycle,
            },
          } as Options
        }
        submission={generateSubmission(value)}
      />
      <Modal
        title="Alert"
        width={{ base: '95%', medium: '30rem' }}
        open={showSubmitModal}
        onClickClose={handleOnClickSubmitModalClose}
      >
        <Text>
          Are you sure you want to submit your application? Once submited you
          won't be able to resubmit.
        </Text>
        <br />
        <Flex width="100%" justifyContent="end">
          <Button variation="primary" onClick={handleOnSubmit}>
            Accept
          </Button>
          <Button onClick={handleOnClickSubmitModalClose}>Cancel</Button>
        </Flex>
      </Modal>
      <Flex justifyContent="space-between">
        <Button onClick={handleOnClickGoBack} variation="primary">
          {application?.submissionStatus === SubmissionStatus.COMPLETED
            ? 'Go back'
            : 'Go back to edit'}
        </Button>
        {application?.submissionStatus !== SubmissionStatus.COMPLETED && (
          <Button onClick={handleOnClickSubmit} variation="primary">
            Submit
          </Button>
        )}
      </Flex>
    </CustomCard>
  );
};

export default HomeownershipReviewPage;
