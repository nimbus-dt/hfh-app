import { useCallback, useState } from 'react';
import { Form as FormioForm, Wizard } from '@formio/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FormAnswer,
  TestApplication,
  SubmissionStatus,
  ReviewStatus,
  LazyFormAnswer,
  RootForm,
} from 'models';
import { DataStore } from 'aws-amplify';
import { generateSubmission } from 'utils/formio';
import { Options } from '@formio/react/lib/components/Form';
import Modal from 'components/Modal';
import dayjs from 'dayjs';
import { usePostHog } from 'posthog-js/react';
import { Button, Flex, Text } from '@aws-amplify/ui-react';
import CustomButton from 'components/CustomButton/CustomButton';
import useAsync from 'hooks/utils/useAsync/useAsync';
import { RecursiveModelPredicate } from '@aws-amplify/datastore';
import { Status } from 'utils/enums';
import uploadSubmission from './services/uploadSubmission';
import style from './Form.module.css';
import FormLayout from './layouts/FormLayout';
import FormProps, { DataProps, DISPLAY, ERROR } from './Form.types';

const FORMIO_URL = process.env.REACT_APP_FORMIO_URL;

const Form = ({
  habitat,
  application,
  cycle,
  formContainer = true,
}: FormProps) => {
  const posthog = usePostHog();
  const navigate = useNavigate();
  const [formReady, setFormReady] = useState<typeof Wizard>();
  const [reviewMode, setReviewMode] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const getData = useCallback(async (): Promise<DataProps> => {
    try {
      if (cycle?.rootformID === undefined)
        return {
          display: DISPLAY.ERROR,
          data: {
            error: ERROR.CYCLE_NOT_FOUND,
          },
        };
      const form = await DataStore.query(RootForm, cycle?.rootformID || '');

      const formAnswers = await DataStore.query(
        FormAnswer,
        (c1: RecursiveModelPredicate<LazyFormAnswer>) =>
          c1.testapplicationID.eq(application?.id || ''),
        undefined
      );

      if (!form) {
        return {
          display: DISPLAY.ERROR,
          data: {
            error: ERROR.CYCLE_NOT_FOUND,
          },
        };
      }

      return {
        display: DISPLAY.APPLICATION,
        data: {
          form,
          formAnswers,
        },
      };
    } catch (error) {
      return {
        display: DISPLAY.ERROR,
        data: {
          error: ERROR.UNEXPECTED_ERROR,
        },
      };
    }
  }, [cycle, application]);

  const { value, status } = useAsync({
    asyncFunction: getData,
  });

  const handleOnReview = async (submission: unknown) => {
    try {
      if (application && cycle) {
        await uploadSubmission({ submission, application });
        setReviewMode(true);
      }
    } catch (error) {
      console.log('Error updating application');
    }
  };

  const handleOnSubmit = async () => {
    try {
      if (application && cycle) {
        const original = await DataStore.query(TestApplication, application.id);

        if (original) {
          posthog?.capture('application_submitted', {
            application,
            cycle,
            habitat,
          });
          posthog?.capture('application_pending', {
            application,
            habitat,
            cycle,
          });

          await DataStore.save(
            TestApplication.copyOf(original, (originalApplication) => {
              originalApplication.submissionStatus = SubmissionStatus.COMPLETED;
              originalApplication.reviewStatus = ReviewStatus.PENDING;
              originalApplication.submittedDate = dayjs().format('YYYY-MM-DD');
            })
          );

          navigate('../applications');
        }
      }
    } catch (error) {
      console.log('Error updating application');
    }
  };

  const handleOnClickGoBack = async () => {
    if (application) {
      const currentApplication = await DataStore.query(TestApplication, (c1) =>
        c1.id.eq(application.id)
      );

      if (currentApplication) {
        await DataStore.save(
          TestApplication.copyOf(currentApplication[0], (original) => {
            original.lastPage = 0;
          })
        );
      }
    }

    setReviewMode(false);
  };

  const handleOnClickSubmit = () => {
    setShowSubmitModal(true);
  };

  const handleOnClickSubmitModalClose = () => {
    setShowSubmitModal(false);
  };

  const handleFormReady = (f: typeof Wizard) => {
    setFormReady(f);
  };

  const handleNextPage = ({
    submission,
    page,
  }: {
    submission: unknown;
    page: number;
  }) => {
    uploadSubmission({
      submission,
      application,
      nextPage: page,
    });
  };

  const options = {
    additional: {
      application,
      habitat,
      openCycle: cycle,
    },
  } as Options;

  const reviewOptions = {
    readOnly: true,
    renderMode: 'flat',
  };

  if (status === Status.PENDING || !value) {
    return null;
  }

  if (status === Status.REJECTED) {
    return <div>Error</div>;
  }

  if (value.display === DISPLAY.ERROR || !habitat || !cycle || !application) {
    return <div>Error</div>;
  }

  const submission = generateSubmission(value.data.formAnswers || []);
  const src = `${FORMIO_URL}/${cycle?.formUrl}`;

  if (
    reviewMode ||
    application?.submissionStatus === SubmissionStatus.COMPLETED
  ) {
    return (
      <div style={{ padding: 0 }}>
        <div>
          <div
            className={
              formContainer
                ? style.formContainer
                : `${style.formContainer} ${style.newpadding}`
            }
          >
            <FormioForm
              key="review"
              src={src}
              options={reviewOptions}
              submission={submission}
            />
            <Modal
              title="Alert"
              width={{ base: '95%', medium: '30rem' }}
              open={showSubmitModal}
              onClickClose={handleOnClickSubmitModalClose}
            >
              <Text>
                Are you sure you want to submit your application? Once submited
                you won't be able to resubmit.
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
              {application?.submissionStatus !== SubmissionStatus.COMPLETED ? (
                <>
                  <CustomButton
                    onClick={handleOnClickGoBack}
                    variation="secondary"
                  >
                    Go back to edit
                  </CustomButton>
                  <CustomButton
                    onClick={handleOnClickSubmit}
                    variation="primary"
                  >
                    Submit
                  </CustomButton>
                </>
              ) : (
                <Link to="../applications">
                  <CustomButton variation="primary">Go back</CustomButton>
                </Link>
              )}
            </Flex>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 0 }}>
      <div>
        <FormLayout
          formReady={formReady}
          habitat={habitat}
          application={application}
          cycle={cycle}
        >
          <div
            className={`${style.formContainer}`}
            style={{ padding: '2rem 1rem' }}
          >
            <FormioForm
              key="real"
              src={src}
              submission={submission}
              options={options}
              onNextPage={handleNextPage}
              onSubmit={handleOnReview}
              formReady={handleFormReady}
            />
          </div>
        </FormLayout>
      </div>
    </div>
  );
};

export default Form;
