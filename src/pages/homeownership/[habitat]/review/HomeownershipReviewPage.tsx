import React, { useEffect, useState } from 'react';
import { Form } from '@formio/react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  FormAnswer,
  Habitat,
  TestApplication,
  TestCycle,
  SubmissionStatus,
} from 'models';
import { DataStore } from 'aws-amplify';
import dayjs from 'dayjs';
import { generateSubmission } from 'utils/formio';
import { Options } from '@formio/react/lib/components/Form';
import { Button, Flex, Text } from '@aws-amplify/ui-react';
import CustomCard from 'components/CustomCard';
import Modal from 'components/Modal';

interface IProperties {
  habitat: Habitat;
  application?: TestApplication;
  openCycle?: TestCycle;
  setApplication: (application: TestApplication) => void;
}

const FORMIO_URL = process.env.REACT_APP_FORMIO_URL;

const HomeownershipReviewPage = () => {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const { application, habitat, openCycle, setApplication } =
    useOutletContext<IProperties>();

  const [formAnswers, setFormAnswers] = useState<FormAnswer[]>([]);

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

          setApplication(updatedApplication);

          navigate('../home');
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

  const handleOnClickSubmit = () => {
    setShowSubmitModal(true);
  };

  const handleOnClickSubmitModalClose = () => {
    setShowSubmitModal(false);
  };

  return (
    <CustomCard>
      <Form
        src={`${FORMIO_URL}/loudoun`}
        onSubmit={handleOnSubmit}
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
        submission={generateSubmission(formAnswers)}
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
          {application?.submissionStatus === SubmissionStatus.SUBMITTED
            ? 'Go back'
            : 'Go back to edit'}
        </Button>
        {application?.submissionStatus !== SubmissionStatus.SUBMITTED && (
          <Button onClick={handleOnClickSubmit} variation="primary">
            Submit
          </Button>
        )}
      </Flex>
    </CustomCard>
  );
};

export default HomeownershipReviewPage;
